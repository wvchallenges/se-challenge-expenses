const ExpenseCategory = require('../models/expense_category');

const TABLE = 'expense_categories';

class ExpenseCategoriesRepository {
  constructor(db) {
    this.db = db;
  }

  find(id) {
    return this.db.findById(TABLE, ExpenseCategory, id)
  }

  create(expenseCategory) {
    return this.db.create(TABLE, ExpenseCategory, expenseCategory)
  }
}

ExpenseCategoriesRepository.dependencyName = 'repo:expenseCategories'
ExpenseCategoriesRepository.dependencies = ['db']

module.exports = ExpenseCategoriesRepository
