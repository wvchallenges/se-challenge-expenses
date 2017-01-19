const fs = require('fs')
const promisify = require('../library/promisify')

class ImportController {
  constructor (importService) {
    this.importService = importService

    this.import = this.import.bind(this)
  }

  async import (ctx) {
    if (ctx.method === 'POST') {
      const csvPath = ctx.request.body.files.expenses.path
      const csvContents = await promisify(fs.readFile)(csvPath, 'utf8')

      // Pass CSV data to import service
      await this.importService.import(csvContents)

      // Send user to report page
      ctx.redirect('/')
      return
    }

    await ctx.render('import')
  }
}

ImportController.dependencies = ['services:import']

module.exports = ImportController
