// Cache implementation saving data in memory
class MemoryCache {
  constructor () {
    this.values = {}
  }

  get (key) {
    return Promise.resolve(this.values[key])
  }

  set (key, value) {
    this.values[key] = value
    return Promise.resolve()
  }

  del (key) {
    delete this.values[key]
    return Promise.resolve()
  }
}

module.exports = MemoryCache
