// Cache implementation wrapper providing utility functions
class Cache {
  constructor (cache) {
    this.cache = cache

    this.get = cache.get.bind(cache)
    this.set = cache.set.bind(cache)
    this.del = cache.del.bind(cache)
  }

  async try (key, fetchFn) {
    const obj = await this.cache.get(key)
    if (obj) {
      return obj
    }

    const freshObj = await fetchFn()
    await this.cache.set(key, freshObj)
    return freshObj
  }
}

module.exports = Cache
