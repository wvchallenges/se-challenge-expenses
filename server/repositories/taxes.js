const TAXES = {}

function registerTax (country, state, type, effectiveSince, percent) {
  const id = `${country}-${state}-${type}-${effectiveSince.getFullYear()}`
  TAXES[id] = {id, country, state, type, effectiveSince, percent}
}

// Register all known taxes in a static object
//
// This makes for fast and easy retrival, those values are not dynamic and
// frozen in time once declared. (Although saving a copy of the percent on
// and expense or invoice is not a bad idea in case we come to violate that
registerTax('US', 'CA', 'sales', new Date(2017, 0, 1), 7.5)
registerTax('US', 'NY', 'sales', new Date(2017, 0, 1), 8.875)

class TaxesRepository {
  findByNameSync (name) {
    const match = name.match(/([A-Z]{2})\sSales tax/)
    if (match) {
      const stateCode = match[1]
      return TAXES[`US-${stateCode}-sales-2017`]
    }

    throw new Error('TaxesRepository: findByName: could not guess tax for name: ' + name)
  }

  // Finds a tax "spoken" name, used when importing from external sources
  //
  // (Returns a promise to be homogenous with how other repo work and
  // for future proofing)
  findByName (name) {
    return new Promise((resolve) => resolve(this.findByNameSync(name)))
  }
}

TaxesRepository.dependencyName = 'repo:taxes'
TaxesRepository.dependencies = []

module.exports = TaxesRepository
