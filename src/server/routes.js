const express = require('express');
const path = require('path');
const Expense = require('./controllers/ExpenseController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = new express.Router();

router.post('/api/record', upload.single('record'), Expense.saveExpense);
router.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../../public/index.html`));
});

module.exports = router;
