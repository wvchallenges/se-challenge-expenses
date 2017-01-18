exports.up = function (knex, Promise) {
  return knex.schema.createTable('taxes', function (t) {
    t.string('id', 26).notNullable().primary()
    t.text('name').notNullable()
    t.integer('year').notNullable()
    t.decimal('percentage', 7, 5).notNullable() // e.g. 99.99999

    t.index(['name', 'year'])
    t.unique(['name', 'year'])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('taxes')
}
