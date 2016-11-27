var express = require('express');
var multer = require('multer');
var checksum = require('checksum-buffer');
var router = express.Router();
var upload = multer({dest: '../uploads/'});
var import_csv = require('../public/javascripts/csv_import');
var db_init = require('../public/javascripts/db_init');
var db_crud = require('../public/javascripts/db_crud');

/* GET home page. */
router.get('/', function(req, res, next) {
  db_init.db_initialize();
  res.render('index', { });
});

/* POST import csv. */
router.post('/importcsv', upload.single('csv'), function(req, res, next) {
   if(typeof req.file.path != 'undefined'){
      import_csv.import_csv_data(req.file.path,
         function(arr, file_note) {
            res.render('importedcsv',{arr: arr, note: file_note});
         }
      );
      return;
   } else {
      var err = new Error('Please select a file to import.');
      err.status = 400;
      return next(err);
   }
});

module.exports = router;
