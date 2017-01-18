const test = require('tape')

const CSVHelper = require('../../server/helpers/csv')
const csvHelper = new CSVHelper()

test('CSVHelper: parse: simple case', function (t) {
  const result = csvHelper.parse(['a'], 'header\nb')
  t.deepEqual(result, [{a: 'b'}])
  t.end()
})

test('CSVHelper: parse: no headers', function (t) {
  const result = csvHelper.parse(['a'], 'b', false)
  t.deepEqual(result, [{a: 'b'}])
  t.end()
})

test('CSVHelper: parse: multiple lines', function (t) {
  const result = csvHelper.parse(['a'], 'h\n1\n2')
  t.deepEqual(result, [{a: '1'}, {a: '2'}])
  t.end()
})

test('CSVHelper: parse: multiple items', function (t) {
  const result = csvHelper.parse(['a', 'b'], 'h\n1,2')
  t.deepEqual(result, [{a: '1', b: '2'}])
  t.end()
})

test('CSVHelper: parse: more items than columns passed', function (t) {
  const result = csvHelper.parse(['a'], 'h\n1,2')
  t.deepEqual(result, [{a: '1', '2': '2'}])
  t.end()
})

test('CSVHelper: parse: more than 1 line feed', function (t) {
  let result

  result = csvHelper.parse(['a'], 'h\r\n1')
  t.deepEqual(result, [{a: '1'}])

  result = csvHelper.parse(['a'], 'h\r\n\n\n1')
  t.deepEqual(result, [{a: '1'}])

  t.end()
})

test('CSVHelper: parse: trailing line feed', function (t) {
  const result = csvHelper.parse(['a'], 'h\n1\n')
  t.deepEqual(result, [{a: '1'}])
  t.end()
})

test('CSVHelper: parse: all together', function (t) {
  const result = csvHelper.parse(['a', 'b'], 'h1,h2,h3\n1,2,3\r\n4,5,6\n')
  t.deepEqual(result, [
    {a: '1', b: '2', '3': '3'},
    {a: '4', b: '5', '3': '6'}
  ])
  t.end()
})
