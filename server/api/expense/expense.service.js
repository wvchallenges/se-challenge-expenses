'use strict'

const async = require('async')
const csv = require('csv')
const Promise = require("bluebird")
const ExpenseQueries = require('./expense.queries')

// Configuration map used to associate csv column indexes with expected field name
const expenseCSVMap = {
    date: 0,
    category: 1,
    employee_name: 2,
    employee_address: 3,
    expense_description: 4,
    pre_tax_amount: 5,
    tax_name: 6,
    tax_amount: 7
}

exports.saveExpenseCSV = function(data) {

    return new Promise(function (resolve, reject) {

        // Split csv into lines so we can verify headers
        var lines = data.split('\n')

        // If ther aren't atleast 2 lines (none or just headers), no point in processing
        if (lines.length < 2) {
            resolve()
        }

        // Get headers row, and remove it from the rest of the expense report file body
        var headers = lines.shift()

        // If the headers aren't correct, return a expected csv fields not matching error
        if (!verifyCSVFields(headers)) {
            reject('Invalid fields in expenses csv')
        }

        // Join the csv lines back together, so they can be all parsed at once
        var rawExpenseData = lines.join('\n')

        // Prase csv file using csv library (accounts for quotes and commas in values and other cases)
        csv.parse(rawExpenseData, function(err, expenseData){

            // Process each row in series - So that duplicate associated records (employees, categories)
            //   aren't created
            async.eachSeries(expenseData,
                function(expenseDataLine, callback){


                    // Promise chain start - get employee by name
                    ExpenseQueries.getEmployeeId(expenseDataLine[expenseCSVMap.employee_name], expenseDataLine[expenseCSVMap.employee_address])
                    // This allows us to have state data for promise chain (using results later in chain)
                    .bind({})
                    // If there is no employee, create one
                    .catch(function(err){
                        return ExpenseQueries.createEmployee(expenseDataLine[expenseCSVMap.employee_name], expenseDataLine[expenseCSVMap.employee_address])
                    })
                    // Get category by name
                    .then(function(employee){
                        this.employee = employee
                        return ExpenseQueries.getCategoryIdByName(expenseDataLine[expenseCSVMap.category])
                    })
                    // If there is no category, create one
                    .catch(function(err){
                        return ExpenseQueries.createCategory(expenseDataLine[expenseCSVMap.category])
                    })
                    // Create expense
                    .then(function(category){
                        var expense = prepareExpenseDataArray(this.employee.id, category.id, expenseDataLine)
                        return ExpenseQueries.createExpense(expense)
                    })
                    .then(function(){
                        callback()
                        return null
                    }).catch(function(err){
                        console.log(err)
                        callback()
                        return null
                    })
                },
                function(err){
                    resolve()
                }
            )
        })
    })
}

// Re-format raw expense data array, into an array that we can use in the query, it includes
//   employeeId and categoryId, instead of the raw values
function prepareExpenseDataArray(employeeId, categoryId, expenseDataLine) {
    var regex = /[ ,]/g
    var preTaxAmount = expenseDataLine[expenseCSVMap.pre_tax_amount].replace(regex, '')
    var taxAmount = expenseDataLine[expenseCSVMap.tax_amount].replace(regex, '')

    var expense = [
        expenseDataLine[expenseCSVMap.date],
        categoryId,
        employeeId,
        expenseDataLine[expenseCSVMap.expense_description],
        preTaxAmount,
        expenseDataLine[expenseCSVMap.tax_name],
        taxAmount
    ]
    return expense
}

// Verify the header line of the csv file, making sure it is what we expect
function verifyCSVFields(headers) {
    var expectedHeaders = 'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount'
    return headers == expectedHeaders
}