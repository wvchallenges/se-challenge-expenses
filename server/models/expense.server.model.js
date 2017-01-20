'use strict';
var dbLib = require('../lib/sqlite.db.connection.js'),
    db = dbLib.getConnection(),
    utils = require('../lib/utils.server'),
    async = require('async');

var expense = {
    expenseId: null,
    date: null,
    employeeId: null,
    expenseCategoryId: null,
    description: null,
    taxId: null,
    preTaxAmount: null,
    taxAmount: null
};

module.exports.createExpense = function(name, address) {
    db.run('CREATE TABLE EXPENSE ' +
        '(EXPENSE_ID INTEGER PRIMARY KEY ASC, DATE NUMERIC, EMPLOYEE_ID INTEGER, ' +
        'EXPENSE_CATEGORY_ID INTEGER, DESCRIPTION TEXT, TAX_ID INTEGER, PRE_TAX_AMOUNT REAL, TAX_AMOUNT REAL)', function(err){
        if(err) {
            console.log('Error in creating expense table!!');
            return;
        }
        //console.log('Created expense table!');
    });
};

module.exports.populate = function(expensesData, callback) {
    db.get('SELECT MAX(EXPENSE_ID) AS EXPENSE_ID FROM EXPENSE',function(err,row){
        if(err) {
            console.log('Error occurred in retrieving values from EXPENSE table');
            return;
        }
        db.serialize( function() {
            //console.log('Expenses Data: ' , expensesData);
            var startExpenseId = 0;
            if (row) {
                //console.log('Rows retrieved from Expense table');
                startExpenseId = row.EXPENSE_ID;
            }
            startExpenseId++;
            //console.log('Start Employee Id: ' + startEmployeeId);
            var stmt = db.prepare('INSERT INTO EXPENSE ' +
                '(EXPENSE_ID, DATE, EMPLOYEE_ID, EXPENSE_CATEGORY_ID, DESCRIPTION, TAX_ID, PRE_TAX_AMOUNT, TAX_AMOUNT) ' +
                'VALUES(?,?,?,?,?,?,?,?)');
            for (var i = 0; i < expensesData.length; i++) {
                expensesData[i].expenseId = startExpenseId;
                stmt.run(startExpenseId++, expensesData[i].date, expensesData[i].employeeId,
                    expensesData[i].expenseCategoryId, expensesData[i].expenseDescription,
                    expensesData[i].taxId, expensesData[i].preTaxAmount, expensesData[i].taxAmount);
            }
            stmt.finalize();

            //console.log('Expenses Data: ' , expensesData);
            printTable();

            if (callback) {
                callback(expensesData);
            }
        });
    });
};

module.exports.printTable = printTable;

function printTable() {
    db.each('SELECT * FROM EXPENSE', function(err,row) {
        if(err) {
            console.log('Error in selecting Data from EXPENSE TABLE');
            return;
        }
        console.log('row: ' , row);
    }, function(err,cntx) {
        if (err) {
            console.log('Error while completing select statement');
            return;
        }
        console.log('Number of rows retrieved: ' + cntx);
    });
}