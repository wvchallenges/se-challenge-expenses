class ReportController {
  constructor (reportService) {
    this.reportService = reportService
  }

  report (ctx) {
    ctx.redirect('/import')
  }
}

ReportController.dependencies = ['services:report']

module.exports = ReportController
