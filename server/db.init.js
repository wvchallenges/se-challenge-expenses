/**
 * Created by bharath on 2017-01-13.
 */
'use strict';

var db = require('./lib/sqlite.db.connection').getConnection(),
    employee = require('./models/employee.server.model'),
    tax = require('./models/tax.server.model'),
    expenseCategory = require('./models/expense.category.server.model'),
    expense = require('./models/expense.server.model');


module.exports.initDB = function() {
    employee.createEmployeeTable();
    tax.createTaxTable();
    expenseCategory.createExpenseCategory();
    expense.createExpense();
};
