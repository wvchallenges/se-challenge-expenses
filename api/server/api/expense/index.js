'use strict';

var express = require('express');
var controller = require('./expense.controller');
var multer = require('multer');
var upload = multer();

var router = express.Router();

router.get('/', controller.index);
router.post('/import', upload.single('data'), controller.import);
// router.get('/:id', controller.show);

// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
