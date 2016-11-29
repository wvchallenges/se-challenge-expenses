//node require
var express = require('express');
var mongodb = require('mongodb');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

//origin CORS open for testing
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

//db localhost url
var url = 'mongodb://localhost:27017/companyXYZ';
var MongoClient = mongodb.MongoClient;


app.use('/', express.static(__dirname + '/public'));

//submit csv file
app.post('/submit', function (req, res) {

  //try connecting to mongodb
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      res.end('failure');
    } else {
      console.log('Connection established to', url);

      //get document logs from db
      var collection = db.collection('logs');
      var data = req.body.data;

      //sync insert each element into db
      function insert(x) {
        if (x > data.length - 1) {
          db.close();
          res.end('success');
        }
        else {
          //some preliminary setup for model
          //month and year from string to numeric
          var dateObject = new Date(data[x][0]);
          var month = dateObject.getMonth() + 1;
          var year = dateObject.getFullYear();
          //get rid of comma in thousands amount
          var ptAmount = parseFloat((data[x][5]).replace(',', ''));
          var tAmount = parseFloat((data[x][7]).replace(',', ''));
          //avoid using mongodb aggregrate add by adding here
          var cAmount = ptAmount + tAmount;
          //schema
          var log = { date: data[x][0], month: month, year: year, category: data[x][1], name: data[x][2], address: data[x][3], description: data[x][4], pretaxamount: ptAmount, tax: data[x][6], taxamount: tAmount, combinedAmount: cAmount };

          //insert entry
          collection.insert([log], function (err, result) {
            if (err) {
              console.log(err);
            } else {
              //iterate to next csv row
              insert(x+1);
            }
          });
        }
      }
      //start at first csv row
      insert(1);
    }
  });
})

//get monthly expense info
app.get('/monthlyexpense', function (req, res) {
  //try connecting to db
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      res.end('failure');
    } else {
      console.log('Connection established to', url);

      //create pipeline aggregration for finding mongodb documents
      var logs = db.collection('logs'),
        pipeline = [
          {
            $group: {
              _id: {year: "$year", month: "$month"},
              totalAmount: { $sum: "$combinedAmount" },
            }
          },
          {
            $sort: { _id: 1, }
          }
        ];

      //aggregrate and json stringify results and send as response
      var JSONresults = {};
      logs.aggregate(pipeline, function (err, result) {
        if (err) throw err;
        JSONresults = (JSON.stringify(result));
        db.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSONresults);
      });

    }

  });
});

//port listen
app.listen(3000, function () {
  console.log('munchmunch server running on port 3000')
})
