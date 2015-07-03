exports.up = (knex, Promise) => {
  return knex.schema.createTable('expenses', table => {
    table.increments();
    table.date('date').notNullable();
    table.text('category').notNullable();
    table.text('name').notNullable();
    table.text('address').notNullable();
    table.text('description').notNullable();
    table.decimal('pretax').notNullable();
    table.text('taxname').notNullable();
    table.decimal('tax').notNullable();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('expenses');
