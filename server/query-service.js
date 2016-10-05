var logger = require('tracer').console();
var pg = require('pg');
var Pool = pg.Pool;
var Promise = require('bluebird');
var dbService = require('./db-service');

var queryService = (function() {
  return {
    createEmployee: function(payload) {
      var query = 'INSERT INTO employees (name, address) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id';
      var values = [payload.name, payload.address]
      return dbService.query(query, values)
      .then(function(res) {
        return res.rows[0].id;
      });
    },
    createExpense: function(payload) {
      logger.log('entered expense', payload.employeeId);
      var query = 'INSERT INTO expenses (employee_id, expense_date, category, description, pre_tax_amount, tax_name, tax_amount) ' +
        'VALUES ($1, to_date($2, \'MM-DD-YYYY\'), $3, $4, $5, $6, $7);';
      var values = [payload.employeeId, payload.expenseDate, payload.category, payload.description, payload.preTaxAmount, payload.taxName, payload.taxAmount];        
      return dbService.query(query, values);
    },
    getExpensesByMonth: function() {
      var query = 'SELECT date_trunc(\'month\', expense_date) AS txn_month, sum(tax_amount)' +
                  'FROM expenses GROUP BY txn_month;'
      var values = [];
      return dbService.query(query, values);            
    }
  };
})();

module.exports = queryService;