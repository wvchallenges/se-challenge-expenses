var models  = require('../models');
var Expense = models.Expense;
var Request = models.Request;

var parser = require('../middleware/parser.js');
var monthify = require('../middleware/monthifier.js').monthify;

var Q = require('q');
var fs = require('fs');
var _ = require('lodash');

function fileToString(file) {
  var deferred = Q.defer();
  fs.readFile(file.path, function(error, data) {
    if (error) {
      deferred.reject(new Error(error));
    }
    deferred.resolve(data.toString());
  });
  return deferred.promise;
};

// given an array of expenses, create a Request
// and then create and save Expense objects
function addExpenses(expenses) {
  return Request.create().then(function(request) {
    _.each(expenses, function(expense) {
      expense.request_id = request.dataValues.id;
    });
    return Expense.bulkCreate(expenses).then(function() {
      return Expense.findAll({
        where: {
          request_id: request.dataValues.id
        }
      });
    });
  });
};

module.exports = {


  addExpenses: function(req, res) {
    if (req.file) {
      // convert the submitted file to a string
      fileToString(req.file)
        .then(function(str) {
          // parse the string to array of expense objects
          return parser.parse(str);
        })
        .then(function(expenses) {
          // save the expense objects
          return addExpenses(expenses);
        })
        .then(function(expenses) {
          return monthify(expenses).then(function(months) {
            return {
              expenses: expenses,
              months: months
            };
          });
        })
        .then(function(data) {
          // return expenses on success
          res.json(data);
        })
        .catch(function(error) {
          // if there are any errors provide an error message
          res.status(400).json({
            error: error.toString()
          });
        });
    } else {
      res.status(400).json({
        error: "No CSV file was provided."
      });
    }
  }
};
