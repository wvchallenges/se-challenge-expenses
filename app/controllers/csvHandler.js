var fs = require('fs'),
  csv  = require('csv'),
  Expense = require('orm').db.models.expense,
  config = require('../../config/config'),
  csvDir = config.root + '/csvDir';


exports.postCSVFile = function (req, res) {

  console.log('A CSV file is being processed.');
  var parser = csv.parse();
  var rowCount = 0;
  var file = req.files.CSVfile;

  getNewFileID(function (err, fileID) {
    if (err) { return res.status(500).send(err); }

    parser.on('readable', function () {
      while (data = parser.read()) {
        if (++rowCount < 2) return; // skip header line
        createExpense(data, file.name, fileID, function (err) {
          if (err) { return res.status(500).send(err); }
        });
      }
    });

    parser.on('finish', function () {
      getMonthlyExpenses(fileID, function  (err, mExpenses) {
        rowCount--; // Don't count the header line
        var successText = 'All done! Processed ' + rowCount + ' rows.';
        console.log(successText);
        res.status(200).json({text: successText, mExpenses: mExpenses});
      });
    });

    fs.createReadStream(file.path)
      .pipe(parser);
  });
};


function createExpense (data, fileName, fileID, cb) {
  var errMsg = '';

  Expense.create([{
    date: parseDate(data[0]),
    category: data[1],
    employeeName: data[2],
    employeeAddress: data[3],
    expenseDescription: data[4],
    preTaxAmount: parseNum(data[5]),
    taxName: data[6],
    taxAmount: parseNum(data[7]),
    sourceFileName: fileName,
    sourceFileID: fileID
  }], function (err, items) {
    if (err) {
      errMsg = 'Could not write an expense to the db.\n';
      errMsg += 'Data: ' + items[0].toString() + '\n';
      errMsg += 'Error Message: ' + err;
    }
    cb(errMsg);
  });
}


function getMonthlyExpenses (fileID, cb) {
  // build an array of total expenses per month

  Expense.find({sourceFileID: fileID}, "date", function (err, expenses) {
    if (err) { return cb(err, null); }
    if (!expenses.length) { return cb(null, []); }

    var mExpenses = [
      { month: getYearMonth(expenses[0]), expense: expenses[0].preTaxAmount  }
    ];

    for (var i=1, l=expenses.length; i<l; i++) {
      var newMonth = getYearMonth(expenses[i]);
      if (mExpenses[0].month.getTime() !== newMonth.getTime()) {
        mExpenses.unshift({
          month: newMonth, expense: expenses[i].preTaxAmount
        });
      }
      else {
        mExpenses[0].expense += expenses[i].preTaxAmount;
      }
    }

    cb(null, mExpenses);
  });
}


function getNewFileID (cb) {
  Expense.aggregate(['sourceFileID']).max('sourceFileID').get(function (err, max) {
    if (err) { cb(err, null); }
    else { cb(null, max && max + 1 || 1); }
  });
}


function getYearMonth(expense) {
  return new Date(expense.date.getFullYear(), expense.date.getMonth());
}


function parseDate (str) {
  var dateComponents = str.split('/').map(function (n) {
    return parseInt(n);
  });
  return new Date(dateComponents[2], dateComponents[0] - 1, dateComponents[1]);
}


function parseNum (str) {
  return parseFloat(str.replace(/[\s,]/g, ''), 10);
}

