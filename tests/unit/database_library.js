const test = require('tape')

const Database = require('../../server/library/database')

test('Database: findWhere: calls knex and creates entity right', (t) => {
  const dbResult = [{id: 1, tax_id: 'abc123'}]
  const fakeKnex = new FakeKnex(dbResult)
  const db = new Database(fakeKnex)

  t.plan(2)
  db.findWhere('table', Entity, {someId: 1}).then((result) => {
    t.deepEqual(fakeKnex.callLog, [
      ['select'],
      ['from', 'table'],
      ['where', {some_id: 1}],
      ['limit', 1]
    ])
    t.deepEqual(result, {id: 1, taxId: 'abc123'})
  }).catch(err => t.fail(err))
})

test('Database: findWhere: return null when no result', (t) => {
  const dbResult = []
  const fakeKnex = new FakeKnex(dbResult)
  const db = new Database(fakeKnex)

  t.plan(1)
  db.findWhere('table', Entity, {id: 1}).then((result) => {
    t.equal(result, null)
  }).catch(err => t.fail(err))
})

test('Database: create: calls knex right', (t) => {
  const dbResult = [{id: 1, tax_id: 'abc123', created_at: '2017'}]
  const fakeKnex = new FakeKnex(dbResult)
  const staticIdGenerator = () => 123
  const db = new Database(fakeKnex, staticIdGenerator)
  const entity = new Entity({taxId: 'abc123'})

  t.plan(2)
  db.create('table', Entity, entity).then((result) => {
    t.deepEqual(fakeKnex.callLog, [
      ['into', 'table'],
      ['insert', {id: 123, tax_id: 'abc123'}], // Notice camelCase -> snake_case
      ['returning', '*']
    ])

    // Notice snake_case -> camelCase (this is based on `result`)
    t.deepEqual(result, {id: 1, taxId: 'abc123', createdAt: '2017'})
  }).catch(err => t.fail(err))
})

class Entity {
  constructor (params) {
    Object.assign(this, params)
  }

  toObject () {
    return this
  }
}

class FakeKnex {
  constructor (result) {
    this.callLog = []
    this.result = result
    this.then = this.then.bind(this)

    const methods = [
      'select', 'from', 'where', 'limit', 'insert', 'into',
      'returning'
    ]
    for (let method of methods) {
      this[method] = this.buildStub(method)
    }
  }

  then (successHandler, errorHandler) {
    if (this.result instanceof Error) {
      errorHandler(this.result)
    } else {
      successHandler(this.result)
    }
  }

  buildStub (name) {
    return (...args) => {
      this.callLog.push([name].concat(args))
      return this // Make method chaining work
    }
  }
}
