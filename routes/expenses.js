// libraries
var upload    = require('upload-file');
var database  = require('./../config/database');
var csv       = require('csv-parse/lib/sync');
var fs        = require('fs');
var _         = require('underscore');

// route
var expenses = {
  populate_tables: function(callback_error, callback_success, file) {
    // populates referenced tables -- category, employee, tax
    console.log('populate_tables');

    var current_file = file;
    var file_contents = fs.readFileSync(current_file.path);
    var parsed_contents = csv(file_contents, {columns:true});
    var error = false;

    // find unique values for category, employees, and tax code
    var unique_categories = _.uniq(_.map(parsed_contents, function(value) {
      if (typeof value.category == 'undefined') {
        error = true;
      }
      return [value.category];
    }), function(value) {
      return value[0];
    });

    var unique_employees = _.uniq(_.map(parsed_contents, function(value) {
      if (typeof value['employee name'] == 'undefined' || typeof value['employee address'] == 'undefined') {
        error = true;
      }
      return [value['employee name'], value['employee address']];
    }), function(value) {
      return value[0]+value[1];
    });

    var unique_tax = _.uniq(_.map(parsed_contents, function(value) {
      if (typeof value['tax name'] == 'undefined') {
        error = true;
      }
      return [value['tax name']];
    }), function(value) {
      return value[0];
    });

    if (error) {
      callback_error();
      return;
    }

    // insert values into appropriate tables
    database.query("INSERT IGNORE INTO category (name) VALUES ?", [unique_categories], function(error) {
      if (error) {
        console.log(error);

        callback_error();
        return
      }

      database.query("INSERT IGNORE INTO employee (name, address) VALUES ?", [unique_employees], function(error) {
        if (error) {
          console.log(error);

          callback_error();
          return
        }

        database.query("INSERT IGNORE INTO tax (name) VALUES ?", [unique_tax], function(error) {
          if (error) {
            console.log(error);

            callback_error();
            return
          }

          // done
          callback_success();
        })
      })
    })
  },
  populate_expenses: function(callback_error, callback_success, file) {
      // populates the expenses table
      console.log('populate_expenses');

      var current_file = file;
      var file_contents = fs.readFileSync(current_file.path);
      var parsed_contents = csv(file_contents, {columns:true});

      var categories = [];
      var employees = [];
      var taxes = [];

      database.query("SELECT * FROM category", function(error, rows) {
        if (error) {
          console.log(error);

          callback_error();
          return
        }
        categories = rows;

        database.query("SELECT * FROM employee", function(error, rows) {
          if (error) {
            console.log(error);

            callback_error();
            return
          }
          employees = rows;

          database.query("SELECT * FROM tax", function(error, rows) {
            if (error) {
              console.log(error);

              callback_error();
              return
            }
            taxes = rows;

            try {
              var expense_records = _.map(parsed_contents, function(record) {

                var record_date = record.date.split('/')[2]+'-'+record.date.split('/')[0]+'-'+record.date.split('/')[1];
                var record_category = _.find(categories, function(category) { return category.name == record.category }).idcategory;
                var record_employee = _.find(employees, function(employee) { return employee.name == record['employee name'] }).idemployee;
                var record_taxes = _.find(taxes, function(tax) { return tax.name == record['tax name'] }).idtax;

                return [record_date, record_category, record_employee, record['expense description'], record['pre-tax amount'], record['tax amount'], record_taxes];
              });

              database.query("INSERT IGNORE INTO expenses (date, category_id, employee_id, description, amount, tax_amount, tax_id) VALUES ?", [expense_records], function(error) {
                if (error) {
                  console.log(error);

                  callback_error();
                  return;
                }

                // inserted ok!
                callback_success();
              })
            } catch (exception) {
              // not able to find ids, lets populate the reference tables.
              expenses.populate_tables(function() {
                console.log('something really broke');
                callback_error();
                return;
              }, function() {
                expenses.populate_expenses(callback_error, callback_success, file);
              }, file);
              return;
            }
          });
        });
      });
  },
  get: {
    '/expenses/summary': function(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      database.query('SELECT * FROM expenses', function(error, rows) {
        if (error) {
          console.log(error);
        }

        res.send(JSON.stringify(rows));
      })
    },
    '/expenses/': function(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      database.query('SELECT * FROM expenses', function(error, rows) {
        if (error) {
          console.log(error);
        }

        res.send(JSON.stringify(rows));
      })
    },
    '/expenses/json': function(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      database.query([
        "SELECT expenses.idexpenses AS ID, expenses.date, employee.name AS 'employee name', employee.address AS 'employee address', category.name as 'category', expenses.description, expenses.amount, tax.name AS 'tax', expenses.tax_amount",
        "FROM expenses",
        "JOIN employee ON expenses.employee_id = employee.idemployee",
        "JOIN category ON expenses.category_id = category.idcategory",
        "JOIN tax ON expenses.tax_id = tax.idtax"
      ].join(' '), function(error, rows) {
        if (error) {
          console.log(error);
          return;
        }

        res.send(JSON.stringify(rows));
      });
    },
    '/expenses/summary/json': function(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      database.query([
        "SELECT SUM(amount) AS Amount, SUM(tax_amount) AS Taxes, SUM(amount+tax_amount) AS Total, YEAR(date) AS Year, MONTH(date) AS Month",
        "FROM expenses",
        "GROUP BY YEAR(date), MONTH(date)"
      ].join(' '), function(error, rows) {
        if (error) {
          console.log(error);
          return;
        }

        res.send(JSON.stringify(rows));
      });
    }
  },
  'post': {
    '/expenses': function(req, res, next) {
      console.log('/expenses')
      res.setHeader('Access-Control-Allow-Origin', '*');

      var expenses_upload = new upload({
        dest: 'uploads',
        acceptFileTypes: /(excel|csv)$/i // will need to update upload.js -- Upload.prototype.validate() should be file.filename not file.name
      });

      expenses_upload.on('end', function(fields, files) {
        console.log('/expenses: files uploaded');

        var number_files = Object.keys(files).length;
        var number_processed = 0;

        for (var file in files) {
          expenses.populate_expenses(function() {
            console.log('/expenses broken')
            res.send(JSON.stringify(false));
            return;
          }, function() {
            console.log('/expenses done');
            number_processed++;

            if (number_processed == number_files) {
              res.send(JSON.stringify(true));
            }
          }, files[file]);
        }
      });

      expenses_upload.on('error', function(error) {
        res.send(JSON.stringify(false));
      })

      expenses_upload.parse(req);
    }
  }
}

module.exports = expenses;
