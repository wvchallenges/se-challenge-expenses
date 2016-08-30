var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var readline = require('readline');
var mysql = require('mysql');

// Initialize mysql connection pool
var pool = mysql.createPool({
  connectionLimit : 100,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'wavedb',
  debug    :  false
});


// Try to find or create a user row based on data
// Pass employeeId in callback function
var findOrCreateEmployee = function(name, address, dataResponse, opt_callback) {
  var callback = opt_callback || function() {};
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      dataResponse['error'] = '1';
      return;
    }

    // Try insert, ignore if row already exist
    // Here check duplicated by name + address as unique key
    var query = 'INSERT IGNORE INTO employees (name, address) VALUES ("' + name + '", "' + address + '")';
    console.log(query);
    connection.query(query, function(err) {
      if (err) {
        console.log(err);
        connection.release();
        dataResponse['error'] = '1';
        return;
      }

      // Get employee_id
      query = 'SELECT * FROM employees WHERE name="' + name + '" AND address="' + address + '"';
      console.log(query);
      connection.query(query, function(err, rows) {
        if (err) {
          console.log(err);
          connection.release();
          dataResponse['error'] = '1';
          return;
        }

        callback(rows[0]['employee_id'] /* employeeId */);
      });
    });
  });
};


// Insert expense row into expenses table
var insertExpense = function(employeeId, date,
                             category, description, preTax, taxName, taxAmount, dataResponse) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      dataResponse['error'] = '1';
      return;
    }

    var query = 'INSERT IGNORE INTO expenses (' +
        'employee_id, expense_date, category, description, pre_tax_amount, tax_name, tax_amount) ' +
        'VALUES (' + employeeId + ', STR_TO_DATE(\'' + date + '\', \'%m/%d/%Y\'), "' +
        category + '", "' + description + '", ' + preTax + ', "' + taxName + '", ' + taxAmount + ');';
    console.log(query);
    connection.query(query, function(err) {
    connection.release();
      if (err) {
        dataResponse['error'] = '1';
      }
    });
  });
};

// Help method to parse each CSV line into String array
// From: http://stackoverflow.com/a/8497474
var CSVtoArray = function(text) {
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  var a = [];                     // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return ''; // Return empty string.
      });
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('');
  return a;
};


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){
  var dataResponse = {};
  var data = {};
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var path = files['upload']['path'];
    var rd = readline.createInterface({
      input: fs.createReadStream(path),
      output: process.stdout,
      terminal: false
    });

    var isFirstLine = true;

    // Read file by line, this way we can avoid memory leak caused by large file
    rd.on('line', function(line) {
      if (isFirstLine) {
        isFirstLine = false;
        return;
      }

      var values = CSVtoArray(line);

      // Prepare response data for table generation
      var params = values[0].split('/');
      // Get unique month as key
      var key = params[2] + '/' + params[0];
      var amount = +values[5].replace(',', '') + +values[7].replace(',', '');
      if (typeof data[key] === 'undefined') {
        data[key] = amount;
      } else {
        data[key] += +amount;
      }

      // Populate data into database tables
      // Employees table first, then insert into expenses table with employee_id
      (function(v) {
        findOrCreateEmployee(v[2] /* name */, v[3] /* address */, dataResponse, function(employeeId) {
          insertExpense(employeeId, v[0] /* date */,  v[1] /* category */,
              v[4] /* description */, v[5] /* preAmount */, v[6] /* taxName */, v[7] /* amount */, dataResponse);
        });
      })(values);
    });

    // Callback when read file finish
    rd.on('close', function() {
      dataResponse['data'] = data;
      res.json(dataResponse);
      return;
    });
  });
});

app.listen(8888, function() {
  console.log('Server started on port ' + 8888);
});
