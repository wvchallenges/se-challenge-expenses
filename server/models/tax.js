const R = require('ramda')

const FIELDS = ['id', 'name', 'year', 'percentage']

class Tax {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toJSON () {
    return R.pick(this, FIELDS)
  }
}

module.exports = Tax
