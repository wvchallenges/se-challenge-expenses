class ReportController {
  constructor (reportService) {
    this.reportService = reportService

    this.report = this.report.bind(this)
  }

  async report (ctx) {
    const reportEntities = await this.reportService.report()
    console.log(reportEntities)

    // If the user didn't import data yet, send him to the import page
    if (Object.keys(reportEntities.expenses).length === 0) {
      ctx.redirect('/import')
      return
    }

    ctx.body = 'report'
  }
}

ReportController.dependencies = ['services:report']

module.exports = ReportController
