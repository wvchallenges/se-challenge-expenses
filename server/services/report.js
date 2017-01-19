const {reduce, assoc} = require('ramda')

class ReportService {
  constructor (
    taxesRepo, employeesRepo, expensesRepo,
    expenseCategoriesRepo
  ) {
    this.taxesRepo = taxesRepo
    this.employeesRepo = employeesRepo
    this.expensesRepo = expensesRepo
    this.expenseCategoriesRepo = expenseCategoriesRepo
  }

  // Fetches all entities needed for an expense report
  //
  // The fetching here is a bit naive and could be improved if speed is needed,
  // we could write this as 3 sql queries
  async report () {
    const result = {
      expenses: {},
      expenseCategories: {},
      employees: {},
      taxes: {}
    }

    // Fetch all concerned expenses
    const expenses = await this.expensesRepo.findAll()
    result.expenses = reduce((acc, v) => assoc(v.id, v, acc), {}, expenses)

    // Fetch related entities & save them on result
    const relationsPromises = []
    relationsPromises.concat(expenses.map(async (e) => {
      const employee = await this.employeesRepo.findById(e.employeeId)
      result.employees[employee.id] = employee
    }))
    relationsPromises.concat(expenses.map(async (e) => {
      const ecr = this.expenseCategoriesRepo
      const category = await ecr.findById(e.categoryId)
      result.expenseCategories[category.id] = category
    }))
    relationsPromises.concat(expenses.map(async (e) => {
      const tax = await this.taxesRepo.findById(e.taxId)
      result.taxes[tax.id] = tax
    }))

    // Wait for all fetches to resolve (happens in parrallel)
    await Promise.all(relationsPromises)
    return result
  }
}

ReportService.dependencyName = 'services:report'
ReportService.dependencies = [
  'repo:taxes', 'repo:employees',
  'repo:expenses', 'repo:expenseCategories'
]

module.exports = ReportService
