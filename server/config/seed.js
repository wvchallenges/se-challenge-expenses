/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Expense = sqldb.Expense;

Expense.sync()
  .then(function() {
    return Expense.truncate();
  });
