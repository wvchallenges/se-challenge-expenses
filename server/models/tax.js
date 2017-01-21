const R = require('ramda')

const FIELDS = ['id', 'country', 'state', 'type', 'effectiveSince', 'percent']

class Tax {
  constructor (values = {}) {
    Object.assign(this, values)
  }

  toObject () {
    return R.pick(this, FIELDS)
  }
}

module.exports = Tax
