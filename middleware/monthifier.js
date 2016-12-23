
var Q = require('q');
var async = require('async');
var _ = require('lodash');

// given a list of Expenses, return an array
// of objects that represent each month in which
// there is one or more given Expenses, and for
// each month, provide a total
function monthify(expenses) {

  var deferred = Q.defer();

  var months = {};

  async.eachOfSeries(expenses, function(expense, key, callback) {
    var date = expense.dataValues.date;
    var month = date.getYear() + '-' + date.getMonth();
    var amount =
        Number(expense.dataValues.pretax_amount) +
        Number(expense.dataValues.tax_amount);
    if (months[month]) {
      months[month].total += amount;
      if (months[month].date.getTime() > date.getTime()) {
        months[month].date = date;
      }
    } else {
      months[month] = {
        total: amount,
        date: date
      };
    }
    callback();
  }, function(error) {
    if (error) {
      deferred.reject(new Error(error));
    }
    deferred.resolve(_.values(months));
  });

  return deferred.promise;

};

module.exports = {
  monthify: monthify
};
