const Employee = require('../models/employee')
const ExpenseCategory = require('../models/expense_category')

class ImportService {
  constructor (
    csvHelper, taxesRepo, employeesRepo,
    expensesRepo, expenseCategoriesRepo
  ) {
    this.csvHelper = csvHelper
    this.taxesRepo = taxesRepo
    this.employeesRepo = employeesRepo
    this.expensesRepo = expensesRepo
    this.expenseCategoriesRepo = expenseCategoriesRepo
  }

  importParseCSV (csvData) {
    const columns = [
      'date', 'category', 'employeeName', 'employeeAddress',
      'description', 'amount', 'taxName'
    ]
    const rawExpenses = this.csvHelper(columns, csvData)

    // Now, all data is still strings, let cast those to the right type
    return rawExpenses.map((e) => {
      // Parse date from "12/20/2000"
      const [dateM, dateD, dateY] = e.date.split('/')
      e.date = new Date(dateY, dateM, dateD)

      // Parse amount as float
      e.amount = parseFloat(e.amount)

      return e
    })
  }

  async importEmployees (expenses) {
    for (let expense of expenses) {
      // Create employee
      const employee = await this.employeesRepo.findOrCreate(new Employee({
        name: expense.employeeName,
        address: expense.employeeAddress
      }))

      // Save newly assigned employee id on expense
      expense.employeeId = employee.id
    }

    return expenses
  }

  async importExpenseCategory (expenses) {
    const findOrCreate = this.expenseCategoriesRepo.findOrCreate

    for (let expense of expenses) {
      // Create employee
      const category = await findOrCreate(new ExpenseCategory({
        name: expense.category
      }))

      // Save newly assigned category id on expense
      expense.categoryId = category.id
    }
  }

  async importFindTaxIds (expenses) {
    for (let expense of expenses) {
      // Create employee
      const tax = await this.taxesRepo.findByName(new Employee())

      expense.taxId = tax.id
    }
  }

  importCreateExpenses (expenses) {
    const create = this.expensesRepo.create.bind(this.expensesRepo)
    return Promise.all(expenses.map(create))
  }

  // Parses expense CSV and saves it's content to the database
  async import (csvData) {
    // Step 1: Parse CSV Data
    const expenses = this.importCSV(csvData)

    // Step 2: Extract employees and save those missing from the database
    await this.importEmployees(expenses)

    // Step 3: Extract expense categories and save the missing ones
    await this.importExpenseCategories(expenses)

    // Step 4: Match taxName with taxIds
    await this.importFindTaxIds(expenses)

    // Step 5: Create all expenses (now we ensured related models exist)
    return await this.importCreateExpenses(expenses)
  }
}

ImportService.dependencyName = 'services:import'
ImportService.dependencies = [
  'helpers:csv',
  'repo:taxes', 'repo:employees',
  'repo:expenses', 'repo:expenseCategories'
]

module.exports = ImportService
