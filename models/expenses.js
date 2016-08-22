var Bookshelf = require('../dbConfig');

var Expense = Bookshelf.Model.extend({
  tableName: 'expenses',
  hasTimestamps: true
});

module.exports = Bookshelf.model('Expense', Expense);
