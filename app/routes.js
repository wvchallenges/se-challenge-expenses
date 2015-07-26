// import required modules
var mysql = require('mysql'), // node-mysql by felixge, MIT license, https://github.com/felixge/node-mysql
  path = require('path');

// mysql config, fill in your server to test
var pool = mysql.createPool({
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
  connectionLimit: 1,
  multipleStatements: true
});

// export the module
module.exports = function(app) {
  // save a batch to DB
  function saveBatch(req, res, cb) {
    // create tables if not exist
    // For the expenses table, all fields are varchar type. This is based on the assumption that we'd like to keep the raw data even if they contain errors. So no data validation / cleaning is done here (but validated at frontend).

    var createStatement =
      "CREATE TABLE IF NOT EXISTS expenses (  date varchar(15) DEFAULT NULL,  category varchar(25) DEFAULT NULL,  employeeName varchar(25) DEFAULT NULL,  employeeAddress varchar(200) DEFAULT NULL,  expenseDescrption varchar(200) DEFAULT NULL,  preTaxAmount varchar(15) DEFAULT NULL,  taxName varchar(25) DEFAULT NULL,  taxAmount varchar(15) DEFAULT NULL,  batchNo int(11) NOT NULL) ENGINE=InnoDB; CREATE TABLE IF NOT EXISTS batches (  date datetime NOT NULL,  rowCount int(11) NOT NULL,  batchNo int(11) NOT NULL) ENGINE=InnoDB";

    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(createStatement, function(err, results) {
        if (err) throw err;
        connection.release();
      });
    });

    // get the maximum batch number, then increase one for the incoming batch
    var selectMaxCountStatement = "SELECT MAX(batchNo) AS maxBatchNo FROM batches; "
    var nextBatchNo = 1;
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(selectMaxCountStatement, function(err, results) {
        if (err) throw err;
        if (results[0].maxBatchNo) {
          nextBatchNo = results[0].maxBatchNo + 1;
        }
        connection.release();

        // Prepare insert statements
        var rows = req.body;
        var insertStatement = "INSERT INTO ?? VALUES (NOW(),?,?); ";
        var inserts = ['batches', rows.length, nextBatchNo];
        insertStatement = mysql.format(insertStatement, inserts);
        for (var i in rows) {
          var sql = "INSERT INTO ?? VALUES (?,?); ";
          var inserts = ['expenses', rows[i], nextBatchNo];
          insertStatement += mysql.format(sql, inserts);
        }
        pool.getConnection(function(err, connection) {
          if (err) throw err;
          connection.query(insertStatement, function(err, results) {
            if (err) throw err;
            connection.release();
            // Callback: send count of rows and batch No. to frontend
            cb(res, {
              count: rows.length,
              batchNo: nextBatchNo
            });
          });
        });
      });
    });
  }

  // get the list of batches from DB
  function getBatchList(req, res, cb) {
    var selectStatement =
      "SELECT * FROM batches ORDER BY batchNo DESC LIMIT 5;";
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(selectStatement, function(err, results) {
        if (err) throw err;
        connection.release();
        cb(res, {
          results: results
        });
      });
    });
  }

  // get a single batch from DB
  function getBatch(req, res, cb) {
    var selectStatement =
      "SELECT * FROM expenses WHERE batchNo = " + req.query.batchNo + ";";
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(selectStatement, function(err, results) {
        if (err) throw err;
        connection.release();
        cb(res, {
          results: results
        });
      });
    });
  }

  // general callback function for sending data back as JSON
  function callback(res, result) {
    if (result && result.name && result.message && result.code) {
      res.status(500);
    }
    res.json(result);
  }

  // routes to handle API calls
  app.get('/api/getBatchList', function(req, res) {
    getBatchList(req, res, callback);
  });
  app.get('/api/getBatch', function(req, res) {
    getBatch(req, res, callback);
  });
  app.post('/api/saveBatch', function(req, res) {
    saveBatch(req, res, callback);
  });

  // route to handle root request
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  });
};
