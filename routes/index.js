var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var expensesController = require('../controllers/expenses.js');


var router  = express.Router();

router.get('/', function(req, res) {
  res.render('index.html');
});

router.post('/api/expenses',
            upload.single('csv_file'),
            expensesController.addExpenses);

module.exports = router;
