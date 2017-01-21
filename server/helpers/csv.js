/* eslint-disable no-fallthrough */
const R = require('ramda')
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
    let inString = false

    for (let i = 0; i < data.length; i++) {
      const currentRow = result[result.length - 1]
      const columnName = columnIndex < columns.length
        ? columns[columnIndex]
        : String(columnIndex + 1)

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
        case '"':
          // Skip appending "string" closing double quote
          inString = false
          break
        case ',':
          // Ignore commas while within a string
          if (!inString) {
            // Look ahead for "string" start
            if (data[i + 1] === '"') {
              inString = true
              i++
            }

            columnIndex++
            break
          }
        default:
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

    const trimWhitespace = R.mapObjIndexed(R.invoker(0, 'trim'))

    return result.slice(sliceStart, sliceEnd).map(trimWhitespace)
  }
}

CSVHelper.dependencyName = 'helpers:csv'
CSVHelper.dependencies = []

module.exports = CSVHelper
