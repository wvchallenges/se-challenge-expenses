const R = require('ramda')

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

class ReportController {
  constructor (reportService) {
    this.reportService = reportService

    this.report = this.report.bind(this)
  }

  groupExpensesByMonth (expenses) {
    const sortedExpenses = R.sortBy(R.prop('date'), R.values(expenses))
    const months = []
    let lastMonth = -1

    for (let expense of sortedExpenses) {
      if (expense.date.getMonth() !== lastMonth) {
        // Add the new month to the list
        months.push({
          year: expense.date.getFullYear(),
          month: expense.date.getMonth(),
          monthName: MONTH_NAMES[expense.date.getMonth()],
          expenses: [expense]
        })
        lastMonth = expense.date.getMonth()
      } else {
        // We didn't change months, simply append expense to last logged month
        months[months.length - 1].expenses.push(expense)
      }
    }

    return months
  }

  async report (ctx) {
    const reportEntities = await this.reportService.report()

    // If the user didn't import data yet, send him to the import page
    if (Object.keys(reportEntities.expenses).length === 0) {
      ctx.redirect('/import')
      return
    }

    // Now groups entites by month and sum ammount for easy rendering
    const months = this.groupExpensesByMonth(reportEntities.expenses)

    const expenseTax = (e) => e.amount * (reportEntities.taxes[e.taxId].percent / 100)

    // Calculate totals for each month (now we have all expenses grouped)
    for (let month of months) {
      // First precompute taxes and pretty numbers for expenses
      month.expenses = month.expenses.map((e) => R.merge(e, {
        employeeName: reportEntities.employees[e.employeeId].name,
        categoryName: reportEntities.expenseCategories[e.categoryId].name,
        amountTax: expenseTax(e),
        amountTotal: e.amount + expenseTax(e)
      }))

      month.totalPreTax = R.sum(R.pluck('amount', month.expenses))
      month.totalTax = R.sum(R.pluck('amountTax', month.expenses))
      month.total = month.totalPreTax + month.totalTax
    }

    await ctx.render('report', {months: R.reverse(months)})
  }
}

ReportController.dependencies = ['services:report']

module.exports = ReportController
