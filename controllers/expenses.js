var models  = require('../models');
var Expense = models.Expense;
var Request = models.Request;

var parser = require('../middleware/parser.js');

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
      fileToString(req.file)
        .then(function(str) {
          return parser.parse(str);
        })
        .then(function(expenses) {
          return addExpenses(expenses);
        })
        .then(function(expenses) {
          res.json({
            expenses: expenses
          });
        })
        .catch(function(error) {
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
