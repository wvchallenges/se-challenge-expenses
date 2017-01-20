/**
 * Created by bharath on 2017-01-12.
 */

'use strict';
var expenseLoader = require('../controllers/expense.loader.server.controller');

module.exports = function(router) {
    /* GET home page. */
    router.post('/load-expenses', expenseLoader.loadExpenses);
};
