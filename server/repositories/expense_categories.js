const ExpenseCategory = require('../models/expense_category')

const TABLE = 'expense_categories'

class ExpenseCategoriesRepository {
  constructor (db, cache) {
    this.db = db
    this.cache = cache
  }

  findById (id) {
    return this.cache.try(
      `db:entities:${TABLE}:${id}`,
      () => this.db.findWhere(TABLE, ExpenseCategory, {id})
    )
  }

  findByName (name) {
    return this.db.findWhere(TABLE, ExpenseCategory, {name})
  }

  async findOrCreate (category) {
    const dbCategory = await this.findByName(category.name)
    if (dbCategory) {
      return dbCategory
    }

    const c = await this.db.create(TABLE, ExpenseCategory, category)
    this.cache.set(`db:entities:${TABLE}:${c.id}`, c)
    return c
  }
}

ExpenseCategoriesRepository.dependencyName = 'repo:expenseCategories'
ExpenseCategoriesRepository.dependencies = ['db', 'cache']

module.exports = ExpenseCategoriesRepository
