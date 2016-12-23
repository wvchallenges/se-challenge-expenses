'use strict';

var csvParse = require('csv-parse');
var Q = require('q');
var async = require('async');

function objectify(csv) {
  var deferred = Q.defer();
  csvParse(csv, {
    auto_parse: true,
    trim: true,
    comment: '#',
    columns: function() {
      return ['date',
              'category',
              'employee_name',
              'employee_address',
              'expense_description',
              'pretax_amount',
              'tax_name',
              'tax_amount'];
    }
  }, function(error, output) {
    if (error) {
      deferred.reject(new Error(error));
    }
    deferred.resolve(output);
  });
  return deferred.promise;
};

function numberify(expenses) {
  var deferred = Q.defer();
  async.eachOfSeries(expenses, function(expense, key, callback) {
    expense.pretax_amount = Number.parseFloat(expense.pretax_amount);
    expense.tax_amount = Number.parseFloat(expense.tax_amount);
    if (Number.isNaN(expense.pretax_amount)) {
      callback(new Error("pretax amount is not a number"));
    } else if (Number.isNaN(expense.tax_amount)) {
      callback(new Error("tax amount is not a number"));
    } else {
      callback();
    }
  }, function(error) {
    if (error) {
      deferred.reject(new Error(error));
    }
    deferred.resolve(expenses);
  });
  return deferred.promise;
};

// TODO more error checking
function parse(csv) {
  return objectify(csv).then(numberify);
};

module.exports = {
  parse: parse
};
