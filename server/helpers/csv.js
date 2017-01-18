const assert = require('assert')

class CSVHelper {
  // Parses a CSV string into an array of object
  //
  // Object attribute names are defined by given `columns` array
  //
  // Example:
  //
  //   parse(['a', 'b'], 'header\n1,2\n3,4')
  //   => [{a: '1', b: '2'}, {a: '3', b: '4'}]
  parse (columns, data, hasHeader = true) {
    assert(Array.isArray(columns), 'CSVHelper: parse: columns needs to be an array')
    assert(typeof data === 'string', 'CSVHelper: parse: data needs to be a string')
    const result = [{}]
    let columnIndex = 0

    for (let i = 0; i < data.length; i++) {
      const currentRow = result[result.length - 1]

      switch (data[i]) {
        case '\r':
        case '\n':
          // If last row in result has items, it's save to create a new one
          // else we want to skip creating a new row as there could be multiple
          // '\r' or '\n' ending the line.
          if (Object.keys(currentRow).length > 0) {
            columnIndex = 0
            result.push({})
          }
          break
        case ',':
          // Matching on ',' without a way to include a comma in strings
          // or escape it is simplistic but ok for our current needs
          columnIndex++
          break
        default:
          const columnName = columnIndex < columns.length
            ? columns[columnIndex]
            : String(columnIndex + 1)
          currentRow[columnName] = (currentRow[columnName] || '') + data[i]
          break
      }
    }

    // Skip the first result/row when we have headers
    const sliceStart = hasHeader ? 1 : 0

    // Skip the last element if it's empty
    // (will have been added if some linefeed was encoundred last)
    const lastItemSize = Object.keys(result[result.length - 1]).length
    const sliceEnd = lastItemSize > 0 ? result.length : result.length - 1

    return result.slice(sliceStart, sliceEnd)
  }
}

CSVHelper.dependencyName = 'helpers:csv'
CSVHelper.dependencies = []

module.exports = CSVHelper
