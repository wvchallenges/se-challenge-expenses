const Expense = require('../models/expense');

const TABLE = 'expenses';

class ExpensesRepository {
  constructor(db) {
    this.db = db;
  }

  find(id) {
    return this.db.findById(TABLE, Expense, id)
  }

  create(expense) {
    return this.db.create(TABLE, Expense, expense)
  }
}

ExpenseCategoriesRepository.dependencyName = 'repo:expenses'
ExpenseCategoriesRepository.dependencies = ['db']

module.exports = ExpensesRepository
