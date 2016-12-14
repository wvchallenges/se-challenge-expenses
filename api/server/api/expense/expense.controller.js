/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/expenses              ->  index
 * POST    /api/expenses              ->  create
 * GET     /api/expenses/:id          ->  show
 * PUT     /api/expenses/:id          ->  update
 * DELETE  /api/expenses/:id          ->  destroy
 */

'use strict';

var accounting = require('accounting');
var moment = require('moment');
var _ = require('lodash');
var csv = require('csv');
var sqldb = require('../../sqldb');
var Expense = sqldb.Expense;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}



// get all expenses
exports.index = function(req, res) {
  Expense.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

var fields = ['expense_date', 'category', 'employee_name', 'employee_address', 'expense_description',
  'pre_tax_amount', 'tax_name', 'tax_amount'];


// import a csv
//
// TODO: this function is getting complicated and difficult to unit test
// split the logic into smaller pieces and add unit tests
exports.import = function(req, res) {

  csv.parse(req.file.buffer, function(err, data) {
    var mappedData = data.slice(1).map((row) => {
      // due to lack of timezone information, we are assuming expense_date uses timezone from web server
      // this can be easily converted to other timezones using moment-timezone
      var record = _.zipObject(fields, row);

      record.expense_date = moment(record.expense_date, 'MM-DD-YYYY');
      record.pre_tax_amount = accounting.unformat(record.pre_tax_amount);
      record.tax_amount = accounting.unformat(record.tax_amount);
      return record;
    });
    Expense.truncate().then(() => {
      return Expense.bulkCreate(mappedData);
    }).then(function() {
      return Expense.findAll();
    }).then(function(records) {
      // performance can be improved by using database group by, i.e.
      // select sum(pre_tax_amount + tax_amount), strftime('%Y-%m', expense_date) as year_month
      // from expenses group by year_month order by year_month;
      // however this is db-specific, and due to sqlite's limited support for timezones, we cannot
      // do calculation in arbitrary timezones
      // in summary, this code works for the example data set
      // but needs refactor once we understand timezone and scalability requirements
      var sums = {};
      records.map(function(record) {
        var key = moment(record.expense_date).format('YYYY-MM');
        if (!(key in sums)) sums[key] = 0;

        sums[key] += record.pre_tax_amount * 10000 + record.tax_amount * 10000;
      });

      var result = [];
      _.forOwn(sums, function(value, key) {
        result.push({
          'month': key,
          'total': accounting.formatMoney(value / 10000)
        });
      });
      res.status(200).json(_.sortByOrder(result, ['month']));
    });
  });

};
