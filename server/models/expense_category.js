const R = require('ramda')

const FIELDS = ['id', 'name']

class ExpenseCategory {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toObject () {
    return R.pick(FIELDS, this)
  }
}

module.exports = ExpenseCategory
