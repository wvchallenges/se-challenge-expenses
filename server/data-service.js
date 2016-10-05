/*
This service file parses the csv data and calls query-service.js to save data into the db.
*/
var fs = require('fs');
var logger = require('tracer').console();
var formidable = require('formidable');
var readline = require('readline');
var Promise = require('bluebird');
var queryService = require('./query-service');

var dbService = (function() {
  return {
    // Fancy drop-in regex solution to parse single CSV string.
    formatCSVString: function(line) {
      var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
      var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
      // Return NULL if input string is not well formed CSV string.
      if (!re_valid.test(line)) return null;
      var a = [];                     // Initialize array to receive values.
      line.replace(re_value, // "Walk" the string using replace with callback.
          function(m0, m1, m2, m3) {
              // Remove backslash from \' in single quoted values.
              if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
              // Remove backslash from \" in double quoted values.
              else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
              else if (m3 !== undefined) a.push(m3);
              return ''; // Return empty string.
          });
      // Handle special case of empty last value.
      if (/,\s*$/.test(line)) a.push('');
      return a;
    },
    parseFile: function(req) {
      var self = this;
      return new Promise(function(resolve, reject) {
        var dataResponse = {};
        // response array with all fields
        var resObj = [];
        var form = new formidable.IncomingForm();
        var promiseArr = [];
        form.parse(req, function(err, fields, files) {
          logger.log('parsing req');
          if (err) {
            logger.log('err');
            res.status(500).json({
              status: "Error"
            })
          }
          var path = files['file']['path'];
          readerObj = readline.createInterface({
            input: fs.createReadStream(path)
          });
          var ctr = 0;
          var isHeader = true;
          var CSVFormattedArray = null;
          // Read the csv line by line
          readerObj.on('line', function(line) {
            if (isHeader) {
              console.log(line)
              isHeader = false;
              return;
            }
            ctr += 1;
            // Doesn't work. Gives output ['"1600 Amphitheatre Parkway', ' Mountain View'..]
            // CSVFormattedString = line.split(',')
            // Instead we use regex to format csv line 
            CSVFormattedArray = self.formatCSVString(line);
            // injecting scopedArr in an anonymous function to protect scope in inner functions.
            (function(scopedArr) {
              promiseArr.push(queryService.createEmployee({
                  name: scopedArr[2],
                  address: scopedArr[3]
                })
                .then(function(employeeId) {
                  var preTaxAmount = scopedArr[5].replace(',', '');
                  var taxAmount = scopedArr[7];
                  var postTaxAmount = parseFloat(preTaxAmount) + parseFloat(taxAmount);
                  var expenseObj = {
                    employeeId: employeeId,
                    expenseDate: scopedArr[0],
                    category: scopedArr[1],
                    description: scopedArr[4],
                    preTaxAmount: preTaxAmount,
                    postTaxAmount: postTaxAmount,
                    taxName: scopedArr[6],
                    taxAmount: taxAmount
                  };
                  resObj.push(expenseObj)
                  return queryService.createExpense(expenseObj);
                })
              );
            })(CSVFormattedArray);
          });

          // Callback when read file finish
          readerObj.on('close', function() {
            Promise.all(promiseArr)
              .then(function(r) {
                return queryService.getExpensesByMonth();
              })
              .then(function(finalResponse) {
                resolve(finalResponse);
              })
              .then(undefined, function(err) {
                logger.log(err);
                reject(err);
              });
          });
        });
      });
    }
  };
})();

module.exports = dbService;