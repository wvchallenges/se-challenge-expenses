const path = require('path');
const express = require('express');
const router = express.Router();

const knexConfig = require('../knexfile.js')[process.env.NODE_ENV];
const knex = require('knex')(knexConfig);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/expenses';

const { parseCSV, rowBuilder } = require('./csv');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '/uploads') });

const getExpenses = () => knex('expenses').select();
const query = {
  delete: (id) => getExpenses().where('id', parseInt(id)).del(),
  get: (id) => (!id ? getExpenses() : getExpenses().where('id', parseInt(id)).first()),
  post: (body) => knex('expenses').insert(body, 'id'),
  update: (id, changes) => getExpenses().where('id', parseInt(id)).update(changes),
}

router.get('/expenses', (req, res, next) => {
  query.get()
    .then(expenses => res.status(200).json(expenses))
    .catch(error => next(error));
});

router.get('/expenses/:id', (req, res, next) => {
  query.get(req.params.id)
    .then(expense => res.status(200).json(expense))
    .catch(error => next(error));
});

router.post('/expenses', (req, res, next) => {
  query.post(req.body)
    .then(id => query.get(id))
    .then(expense => res.status(200).json(expense))
    .catch(error => next(error));
});

router.put('/expenses/:id', (req, res, next) => {
  if (req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'invalid id field',
    });
  }
  query.update(req.params.id, req.body)
    .then(id => query.get(id))
    .then(expense => res.status(200).json(expense))
    .catch(error => next(error));
});

router.delete('/expenses/:id', (req, res, next) => {
  query.get(req.params.id)
    .then(expense => {
      return query.delete(req.params.id).then(() => expense);
    })
    .then(expense => res.status(200).json(expense))
    .catch(error => next(error));
});

router.post('/csv', upload.single('myFile'), (req, res, next) => {
  if (req.file) {
    if (req.file.size < 1) {
      return next(new Error('Cannot upload empty file'));
		}
    if (req.file.size > 1000000) {
      return next(new Error('File size too large'));      
    }
    const parsing = parseCSV(req.file, output => {
      const newRows = output.map(row => rowBuilder(row));
      query.post(newRows)
        .then(ids => getExpenses().whereIn('id', ids))
        .then(expenses => res.status(200).json(expenses))
        .catch(error => next(error));
    });
    if (!parsing) {
      return next(new Error('Broken'));
    }
  }
});

module.exports = router;