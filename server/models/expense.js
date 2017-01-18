const R = require('ramda')

const FIELDS = [
  'id', 'date', 'category_id', 'employee_id', 'tax_id',
  'description', 'amount'
]

class Expense {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toJSON () {
    return R.pick(this, FIELDS)
  }
}

module.exports = Expense
