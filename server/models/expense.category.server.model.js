'use strict';
var dbLib = require('../lib/sqlite.db.connection.js'),
    db = dbLib.getConnection();

var expenseCategory = {
    expenseCategory: null,
    category: null,
    description: null
};

module.exports.createExpenseCategory = function(name, address) {
    db.run('CREATE TABLE EXPENSE_CATEGORY (EXPENSE_CATEGORY_ID INTEGER PRIMARY KEY ASC, CATEGORY TEXT, DESCRIPTION TEXT)', function(err){
        if(err) {
            console.log('Error in creating expense category table!!');
            return;
        }
        //console.log('Created expense category table!');
    });
};

module.exports.populate = function(expensesData, res, callback) {

    db.get('SELECT MAX(EXPENSE_CATEGORY_ID) AS EXPENSE_CATEGORY_ID FROM EXPENSE_CATEGORY',function(err,row) {
        if (err) {
            console.log('Error occurred in retrieving values from EXPENSE_CATEGORY table');
            return;
        }
        db.serialize(function () {
            var startExpenseCategoryId = 0;
            if(row) {
                startExpenseCategoryId = row.EXPENSE_CATEGORY_ID;
            }
            startExpenseCategoryId++;
            var stmt = db.prepare('INSERT INTO EXPENSE_CATEGORY (EXPENSE_CATEGORY_ID, CATEGORY) VALUES(?,?)');
            var expenseCategoryMap = {};
            for (var i = 0; i < expensesData.length; i++) {
                if (typeof expenseCategoryMap[expensesData[i].expenseCategory] !== 'undefined' ) {
                    expensesData[i].expenseCategoryId = expenseCategoryMap[expensesData[i].expenseCategory];
                    continue;
                }
                expenseCategoryMap[expensesData[i].expenseCategory] = startExpenseCategoryId;
                expensesData[i].expenseCategoryId = startExpenseCategoryId;
                stmt.run(startExpenseCategoryId++, expensesData[i].expenseCategory);

            }
            stmt.finalize();

            printTable();

            if (callback) {
                callback(expensesData,res);
            }
        });
    });
};

module.exports.printTable = printTable;

function printTable() {
    db.each('SELECT * FROM EXPENSE_CATEGORY', function(err,row) {
        if(err) {
            console.log('Error in selecting Data from EXPENSE_CATEGORY TABLE');
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