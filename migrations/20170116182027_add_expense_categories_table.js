exports.up = function (knex, Promise) {
  return knex.schema.createTable('expense_categories', function (t) {
    t.string('id', 26).notNullable().primary()
    t.text('name').notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('expense_categories');
};
