const R = require('ramda')

const FIELDS = ['id', 'name']

class ExpenseCategory {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toJSON () {
    return R.pick(this, FIELDS)
  }
}

module.exports = ExpenseCategory
