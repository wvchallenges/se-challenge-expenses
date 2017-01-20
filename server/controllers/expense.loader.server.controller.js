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
    if(!req.body.expensesData) {
        console.log('No file uploaded!!');
        var err = new Error('No file uploaded!!');
        err.status = 400;
        next(err);
        return;
    }
    processExpensesFile(req.body.expensesData,res,next);
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
    populateDataTables(expensesData,res);
    //console.log('Expenses Data: ' , expensesData);
    //res.render('result', { message: 'Request Processed Successfully!!', expensesData: expensesData });
}

function populateDataTables(expensesData,res) {
    // Start populating the tables and pass the subsequent table populate functions as callbacks
    populateEmployeeTable(expensesData,res);
}

function populateEmployeeTable(expensesData,res) {
    employee.populate(expensesData,res,populateTaxTable);
}

function populateTaxTable(expensesData,res) {
    // Assumption that the expenses Data are sorted on date field in ascending order
    tax.populate(expensesData,res,populateExpenseCategoryTable,res);
}

function populateExpenseCategoryTable(expensesData,res) {
    expenseCategory.populate(expensesData,res,populateExpenseTable);
}

function populateExpenseTable (expensesData,res) {
    expense.populate(expensesData,res,queryExpenseTableAndCalculateExpenseSummary);
}

function queryExpenseTableAndCalculateExpenseSummary(expensesData,res) {
    // Not querying expenses table. Since expensesData is the one that was used, to populate the expense table
    // Ideally the month wise calculation should be done at the front - end.
    // As a newbie to hogan I am using front end just to render the info that is sent from the backend
    // Assumption for the expensesData - Sorted in Ascending based on the date
    var expensesDataSummary = [];
    var prevExpensesDataSummaryEntry = -1;

    //console.log('expenses Data: ' , expensesData);
    for(var i = 0; i < expensesData.length; i++) {
        var dateParts = expensesData[i].dateStr.split('/');
        if(dateParts.length < 3) {
            continue;
        }
        var currentMonthEntry = dateParts[0] + '/' + dateParts[2];

        if(prevExpensesDataSummaryEntry < 0 ||
            expensesDataSummary[prevExpensesDataSummaryEntry].month !== currentMonthEntry) {

            expensesDataSummary.push({
                month:currentMonthEntry,
                preTaxAmount: expensesData[i].preTaxAmount,
                taxAmount: expensesData[i].taxAmount,
                totalAmount:  expensesData[i].preTaxAmount + expensesData[i].taxAmount
            });
            prevExpensesDataSummaryEntry++;
            continue;
        }
        expensesDataSummary[prevExpensesDataSummaryEntry].preTaxAmount =
            expensesDataSummary[prevExpensesDataSummaryEntry].preTaxAmount + expensesData[i].preTaxAmount;
        expensesDataSummary[prevExpensesDataSummaryEntry].taxAmount =
            expensesDataSummary[prevExpensesDataSummaryEntry].taxAmount + expensesData[i].taxAmount;
        expensesDataSummary[prevExpensesDataSummaryEntry].totalAmount =
            expensesDataSummary[prevExpensesDataSummaryEntry].totalAmount +
                expensesData[i].preTaxAmount + expensesData[i].taxAmount;
    }
    //console.log('Expenses Data Summary: ' , expensesDataSummary);
    res.render('result', { title: 'Wave Software Development Challenge',
        message: 'Request Processed Successfully!!',
        expensesDataSummary: expensesDataSummary });
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
            dateStr: rawExpenseDataArray[EXPENSE_DATA.DATE],
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