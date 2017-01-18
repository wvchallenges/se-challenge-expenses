const test = require('tape')

const Container = require('../../server/library/container')

test('Container: set: checks name is a string', function (t) {
  const c = new Container()
  t.throws(() => c.set(1, 'value'))
  t.end()
})

test('Container: set: saves instance value', function (t) {
  const c = new Container()
  c.set('x', 'value')
  t.equal(c.contents['x'], 'value')
  t.end()
})

test('Container: set: logs debug info', function (t) {
  let logged = null
  const c = new Container((message) => {
    logged = message
  })
  c.set('x', 'value')
  t.equal(logged, 'container: set: x')
  t.end()
})

test('Container: set: works when not given log', function (t) {
  const c = new Container()
  c.set('x', 'value') // This shouldn't throw
  t.end()
})

test('Container: get: fetches the right value', function (t) {
  const c = new Container()
  const obj = {}
  c.set('x', obj)
  t.equal(c.get('x'), obj)
  t.end()
})

test('Container: get: throws when missing value', function (t) {
  const c = new Container()
  t.throws(() => c.get('x'))
  t.end()
})

test('Container: create: passes the right values to constructor', function (t) {
  class X {
    constructor (y, z) {
      this.y = y
      this.z = z
    }
  }
  X.dependencies = ['y', 'z']

  class Y {}
  const y = new Y()

  class Z {}
  const z = new Z()

  const c = new Container()
  c.set('y', y)
  c.set('z', z)
  const instance = c.create(X)

  t.equal(instance.y, y)
  t.equal(instance.z, z)
  t.end()
})

test('Container: create: throws when missing dependencies', function (t) {
  class X {}
  const c = new Container()
  t.throws(() => c.create(X))
  t.end()
})

test('Container: load: sets create\'s result', function (t) {
  class X {}
  X.dependencyName = 'the x'

  const c = new Container()
  c.create = () => 'value'

  c.load(X)

  t.equal(c.get('the x'), 'value')
  t.end()
})

test('Container: load: throws when missing dependencyName', function (t) {
  class X {}
  const c = new Container()
  t.throws(() => c.load(X))
  t.end()
})
