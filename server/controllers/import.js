class ImportController {
  constructor (importService) {
    this.importService = importService
  }

  async import (ctx) {
    await ctx.render('import')
  }
}

ImportController.dependencies = ['services:import']

module.exports = ImportController
