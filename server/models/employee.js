const R = require('ramda')

const FIELDS = ['id', 'name', 'address']

class Employee {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toJSON () {
    return R.pick(this, FIELDS)
  }
}

module.exports = Employee
