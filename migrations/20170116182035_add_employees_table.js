exports.up = function (knex, Promise) {
  return knex.schema.createTable('employees', function (t) {
    t.string('id', 26).notNullable().primary()
    t.text('name').notNullable()
    t.text('address').notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('employees');
};
