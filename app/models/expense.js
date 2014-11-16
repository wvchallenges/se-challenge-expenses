// Expense model

var db = require('orm').db;

var Expense = db.define('expense', {
  date: Date,
  category: String,
  employeeName: String,
  expenseDescription: String,
  preTaxAmount: Number,
  taxName: String,
  taxAmount: Number,
  sourceFileName: String,
  sourceFileID: Number
}, {
  methods: {
    example: function(){
      // return example;
    }
  }
});

Expense.sync(function (err) {
  if (!err) { console.log('Expense table loaded.')}
  else { console.error('Error loading Expense table :', err); }
});
