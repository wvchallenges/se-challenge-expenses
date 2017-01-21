const R = require('ramda')

const FIELDS = [
  'id', 'date', 'categoryId', 'employeeId', 'taxId',
  'description', 'amount'
]

class Expense {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toObject () {
    return R.pick(FIELDS, this)
  }
}

module.exports = Expense
