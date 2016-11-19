var express = require('express');
var router = express.Router();

var bridge = require('../modules/db-bridge')
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Handle Uploads */
router.post('/uploadCsv', function(req, res, next){
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    bridge.filesToDb(files.files)
  });
});

module.exports = router;
