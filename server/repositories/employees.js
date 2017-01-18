const Employee = require('../models/employee')

const TABLE = 'employees'

class EmployeesRepository {
  constructor (db, cache) {
    this.db = db
    this.cache = cache
  }

  findById (id) {
    return this.db.findWhere(TABLE, Employee, {id})
  }

  findByName (name) {
    return this.db.findWhere(TABLE, Employee, {name})
  }

  async findOrCreate (employee) {
    const dbEmployee = await this.findByName(employee.name)
    if (dbEmployee) {
      return dbEmployee
    }

    const e = await this.db.create(TABLE, Employee, employee)
    this.cache.set(`db:entities:${TABLE}:${e.id}`, e)
    return e
  }
}

EmployeesRepository.dependencyName = 'repo:employees'
EmployeesRepository.dependencies = ['db', 'cache']

module.exports = EmployeesRepository
