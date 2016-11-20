var fs = require('fs')
var _ = require('underscore');
var parse = require('csv-parse/lib/sync');
var mysql = require('mysql');
var async = require('async');

var dbName = 'SeChallenge';
var tableName = 'Expenses';

// TODO: use habitat to store password in environment variables
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('CREATE DATABASE IF NOT EXISTS ' + dbName, function(err, rows) {
  if (err) {
    console.error(err.stack);
  }
  console.log("database is ready");
});

/**
 * function to parse csv file content and store in db
 * @param  {[file]} files [array of files]
 */
exports.filesToDb = function(files, res, next) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : dbName
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return next(err);
    }
    console.log('connected as id ' + connection.threadId);
  });

  //date,category,employee name,employee address,expense description,
  //pre-tax amount,tax name,tax amount
  q = 'CREATE TABLE IF NOT EXISTS ' + tableName +' \
      (\
      Date DATE,\
      Category varchar(255),\
      EmployeeName varchar(255),\
      EmployeeAddress varchar(255),\
      ExpenseDescription text,\
      PreTaxAmount float,\
      TaxName varchar(255),\
      TaxAmount float\
      );'
  connection.query(q, function(err, rows) {
    if (err) {
      return next(err);
    }

    var insertPosts = [];

    _.each(files, function(file) {
      var contents = fs.readFileSync(file.path, 'utf8');
      var output = parse(contents, {comment: '#', delimiter: ','});

      _.each(output.slice(1), function(row) {
        // Date
        // console.log(row[0]);
        var date = new Date(row[0]).toISOString().slice(0,10);
        row[0] = date
        // console.log(row);
        post = {
          Date : date,
          Category : row[1],
          EmployeeName : row[2],
          EmployeeAddress : row[3],
          ExpenseDescription : row[4],
          PreTaxAmount : parseFloat(row[5].replace(",","")),
          TaxName : row[6],
          TaxAmount : parseFloat(row[7].replace(",",""))
        }

        connection.query('INSERT INTO ' + tableName + ' SET ?', post,
        function(err, rows) {
          if (err) {
            return next(err);
          }
        });
        insertPosts.push(post)
      }); // each(output)
    }); // each(files)
    res.end();
  }); // connect
}
