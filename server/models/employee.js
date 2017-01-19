const R = require('ramda')

const FIELDS = ['id', 'name', 'address']

class Employee {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toObject () {
    return R.pick(FIELDS, this)
  }
}

module.exports = Employee
