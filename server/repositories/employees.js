const Employee = require('../models/employee');

const TABLE = 'employees';

class EmployeesRepository {
  constructor(db) {
    this.db = db;
  }

  find(id) {
    return this.db.findById(TABLE, Employee, id)
  }

  create(employee) {
    return this.db.create(TABLE, Employee, employee)
  }
}

EmployeesRepository.dependencyName = 'repo:employees'
EmployeesRepository.dependencies = ['db']

module.exports = EmployeesRepository
