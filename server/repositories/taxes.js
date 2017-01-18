const Tax = require('../models/tax');

const TABLE = 'taxes';

class TaxesRepository {
  constructor(db) {
    this.db = db;
  }

  find(id) {
    return this.db.findById(TABLE, Tax, id)
  }

  create(tax) {
    return this.db.create(TABLE, Tax, tax)
  }
}

TaxesRepository.dependencyName = 'repo:taxes'
TaxesRepository.dependencies = ['db']

module.exports = TaxesRepository
