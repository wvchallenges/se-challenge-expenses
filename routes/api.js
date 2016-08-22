var express = require('express');
var router = express.Router();

var Bookshelf = require('../dbConfig');
var Expense = require('../models/expenses');
var Expenses = Bookshelf.Collection.extend({ model: Expense });

router.post('/upload', function(req, res, next) {
  var expenseObjs = [],
    expenses, resultData = [];

  req.body.forEach(function(item) {
    expenseObjs.push({
      date: item['date'],
      category: item['category'],
      employeeName: item['employee name'],
      employeeAddress: item['employee address'],
      description: item['expense description'],
      preTaxAmount: item['pre-tax amount'].replace(/\,/g,''),
      taxName: item['tax name'],
      taxAmount: item['tax amount'].replace(/\,/g,'')
    });
  });

  expenses = Expenses.forge(expenseObjs);
  expenses.invokeThen('save').then(function(collection) {

    collection.forEach(function(item) {
      resultData.push(item.attributes);
    });

    resultData.sort(function(a, b){
      var date1 = new Date(a.date);
      var date2 = new Date(b.date);

      return date1 - date2;
    });

    res.json(resultData);
  }, function() {
    res.status(500).send();
  });

});

module.exports = router;
