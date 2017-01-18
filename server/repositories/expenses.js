const Expense = require('../models/expense')

const TABLE = 'expenses'

class ExpensesRepository {
  constructor (db, cache) {
    this.db = db
    this.cache = cache
  }

  async findById (id) {
    return this.cache.try(
      `db:entities:${TABLE}:${id}`,
      () => this.db.findWhere(TABLE, Expense, {id})
    )
  }

  async create (expense) {
    const e = await this.db.create(TABLE, Expense, expense)
    await this.cache.set(`db:entities:${TABLE}:${e.id}`, e)
    return e
  }
}

ExpensesRepository.dependencyName = 'repo:expenses'
ExpensesRepository.dependencies = ['db', 'cache']

module.exports = ExpensesRepository
