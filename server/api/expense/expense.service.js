'use strict'

const async = require('async')
const csv = require('csv')
const ExpenseQueries = require('./expense.queries')

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

exports.saveExpenseCSV = function(data, cb) {

    var lines = data.split('\n')
    if (lines.length == 0) {
        cb(null, [])
    }

    var headers = lines.shift()

    if (!verifyCSVFields(headers)) {
        cb('Invalid fields in expenses csv')
    }

    var rawExpenseData = lines.join('\n')

    csv.parse(rawExpenseData, function(err, expenseData){
        async.mapSeries(expenseData,
            function(expenseDataLine, callback){

                ExpenseQueries.getEmployeeId(expenseDataLine[expenseCSVMap.employee_name], expenseDataLine[expenseCSVMap.employee_address], function(err, employeeId){
                    if (err) {
                        console.log(err)
                        return callback()
                    } else {

                        ExpenseQueries.getCategoryIdByName(expenseDataLine[expenseCSVMap.category], function(err, categoryId){
                            if (err) {
                                console.log(err)
                                return callback()
                            } else {

                                var expense = prepareExpenseDataArray(employeeId, categoryId, expenseDataLine)

                                ExpenseQueries.createExpense(expense, function(err){
                                    if (err) {
                                        console.log(err)
                                    }
                                    callback()
                                    return null
                                })
                            }
                        })
                    }
                })
            },
            cb
        )
    })
}

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

function verifyCSVFields(headers) {
    var expectedHeaders = 'date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount'
    return headers == expectedHeaders
}