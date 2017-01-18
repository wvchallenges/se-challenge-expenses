const ulid = require('ulid')
const humps = require('humps')

class Database {
  constructor(knex) {
    this.knex = knex
  }

  async findById(TABLE, Entity, id) {
    const data = await this.db
      .select()
      .from(TABLE)
      .where('id', id)
      .limit(1)

    if (!data || data.length === 0) {
      return null
    }
    return new Entity(humps.camelizeKeys(data[0]))
  }

  async create(TABLE, Entity, entity) {
    entity.id = ulid(); // Assign a new id

    const data = await this.db
      .into(TABLE)
      .insert(humps.decamelizeKeys(entity.toObject()))
      .returning('*')

    return new Entity(humps.camelizeKeys(data[0]));
  }
}

module.exports = Database;
