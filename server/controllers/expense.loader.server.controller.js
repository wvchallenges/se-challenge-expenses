/**
 * Created by bharath on 2017-01-12.
 */
'use strict';
var fs=require('fs'),
    employee = require('../models/employee.server.model'),
    tax = require('../models/tax.server.model'),
    expenseCategory = require('../models/expense.category.server.model'),
    expense = require('../models/expense.server.model'),
    utils = require('../lib/utils.server');

var EXPENSE_DATA = {
    DATE: 0,
    EXPENSE_CATEGORY: 1,
    EMPLOYEE_NAME: 2,
    EMPLOYEE_ADDRESS: 3,
    EXPENSE_DESCRIPTION: 4,
    PRE_TAX_AMOUNT: 5,
    TAX_NAME: 6,
    TAX_AMOUNT: 7
};

module.exports.loadExpenses = function(req,res,next) {
    if(!req.file) {
        console.log('No file uploaded!!');
        var err = new Error('No file uploaded!!');
        err.status = 400;
        next(err);
        return;
    }
    fs.readFile(req.file.path,'utf8',function(err,data){
        if(err) {
            next(err);
            return;
        }
        processExpensesFile(data,res,next);
        //res.render('result', { message: 'File Processed Successfully!!' });
    });
};

function processExpensesFile(data,res,next) {
    if(!data || data.trim().length === 0) {
        var err = new Error('Empty File !!');
        err.status = 400;
        next(err);
    }

    var rawExpensesData = data.split('\n');
    rawExpensesData.shift();
    if(!rawExpensesData.length === 0) {
        var err = new Error('No Expenses Data to export!!');
        err.status = 400;
        next(err);
    }
    var expensesData = extractExpensesData(rawExpensesData);
    expensesData = sortExpensesData(expensesData);
    //console.log('Expenses Data: ' , expensesData);
    populateDataTables(expensesData);
    res.render('result', { message: 'File Processed Successfully!!', expensesData: expensesData.toString() });
}

function populateDataTables(expensesData) {
    // Start populating the tables and pass the subsequent tables to be populated as callbacks
    populateEmployeeTable(expensesData);
}

function populateEmployeeTable(expensesData) {
    employee.populate(expensesData,populateTaxTable);
}

function populateTaxTable(expensesData) {
    // Assumption that the expenses Data are sorted ascending on date field
    tax.populate(expensesData,populateExpenseCategoryTable);

}

function populateExpenseCategoryTable(expensesData) {
    expenseCategory.populate(expensesData,populateExpenseTable);
}

function populateExpenseTable (expensesData) {
    expense.populate(expensesData);
}

function sortExpensesData(expensesData) {
    for(var i = 0 ; i < expensesData.length; i++) {
        for(var j = i+1; j < expensesData.length; j++) {
            if(expensesData[j].date < expensesData[i].date) {
                var tmp = expensesData[i];
                expensesData[i] = expensesData[j];
                expensesData[j] = tmp;
            }
        }
    }
    return expensesData;
}

function extractExpensesData(rawExpensesData) {
    var expensesData = [];
    for (var i = 0; i < rawExpensesData.length; i++) {
        var rawExpenseDataArray = utils.splitExpenseData(rawExpensesData[i]);
        expensesData.push({
            expensesId: null,
            dateString: rawExpenseDataArray[EXPENSE_DATA.DATE],
            date: utils.convertDateStringToTimeStamp(rawExpenseDataArray[EXPENSE_DATA.DATE]),
            expenseCategoryId: null,
            expenseCategory: rawExpenseDataArray[EXPENSE_DATA.EXPENSE_CATEGORY],
            expenseDescription: rawExpenseDataArray[EXPENSE_DATA.EXPENSE_DESCRIPTION],
            employeeId: null,
            employeeName: rawExpenseDataArray[EXPENSE_DATA.EMPLOYEE_NAME],
            employeeAddress: rawExpenseDataArray[EXPENSE_DATA.EMPLOYEE_ADDRESS],
            taxId: null,
            taxName: rawExpenseDataArray[EXPENSE_DATA.TAX_NAME],
            preTaxAmount: utils.parseAmount(rawExpenseDataArray[EXPENSE_DATA.PRE_TAX_AMOUNT]),
            taxAmount: utils.parseAmount(rawExpenseDataArray[EXPENSE_DATA.TAX_AMOUNT])
        });
    }
    return expensesData;
}