const ulid = require('ulid')
const humps = require('humps')

class Database {
  constructor (knex, idGenerator = ulid) {
    this.knex = knex
    this.idGenerator = idGenerator
  }

  async findWhere (TABLE, Entity, where) {
    const data = await this.knex
      .select()
      .from(TABLE)
      .where(humps.decamelizeKeys(where))
      .limit(1)

    if (!data || data.length === 0) {
      return null
    }
    return new Entity(humps.camelizeKeys(data[0]))
  }

  async find (TABLE, Entity, options = {}) {
    let query = this.knex.select().from(TABLE)

    if (options.where) {
      query = query.where(humps.decamelizeKeys(options.where))
    }
    if (options.limit) {
      query = query.limit(1)
    }

    const data = await query

    if (!data || data.length === 0) {
      return []
    }
    return data.map(row => new Entity(humps.camelizeKeys(row)))
  }

  async create (TABLE, Entity, entity) {
    entity.id = this.idGenerator() // Assign a new id

    const data = await this.knex
      .into(TABLE)
      .insert(humps.decamelizeKeys(entity.toObject()))
      .returning('*')

    return new Entity(humps.camelizeKeys(data[0]))
  }
}

module.exports = Database
