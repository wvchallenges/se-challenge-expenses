const assert = require('assert')
const R = require('ramda')

// Creates an instance of a class, passing args to the constructor
// ES6 constructors need the `new` keyword to be used, so, no .apply
// magic can be done here until WebReflection lands in Node.js stable.
function applyToConstructor (constructor, args) {
  return R.apply(R.construct(constructor), args)
}

class Container {
  constructor (log) {
    this.log = log || (() => {})
    this.contents = {}

    // Help avoid unbound this error for cases where `container.{get,set}`
    // is being passed around as a value
    this.get.bind(this)
    this.set.bind(this)
  }

  // Get an object's instance by name
  get (name) {
    assert(name in this.contents, 'container: get: nothing registered for "' + name + '"')
    return this.contents[name]
  }

  // Set an object's instance by name
  set (name, instance) {
    assert(typeof name === 'string', 'container: set: name must be a string')
    this.log('container: set: ' + name)
    this.contents[name] = instance
    return instance
  }

  create (klass) {
    assert(Array.isArray(klass.dependencies), 'container: create: class given doesn\'t have `dependencies` defined (or not an array)')

    const dependencies = []
    R.forEach(function (dependencyName) {
      dependencies.push(this.get(dependencyName))
    }.bind(this), klass.dependencies)

    return applyToConstructor(klass, dependencies)
  }

  load (klass) {
    assert(typeof klass.dependencyName === 'string', 'container: load: class given doesn\'t have a `dependencyName` defined')

    const instance = this.create(klass)
    return this.set(klass.dependencyName, instance)
  }
}

module.exports = Container
