// Main server file.
var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('tracer').console();
var bodyParser = require('body-parser');
var cors = require('cors');
var dataService = require('./server/data-service');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'app')));
app.use(cors());
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// Route to upload and save the csv contents in the db
app.post('/upload_csv', function(req, res) {
  console.log('touching server');
  dataService.parseFile(req)
  .then(function(response) {
    res.status(200).json({ status: "Success", response: response});
  })
  .then(undefined, function(err) {
    logger.log(err);
    res.status(500).json({ status: "Failure", response: err});
  })
});