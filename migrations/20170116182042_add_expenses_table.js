exports.up = function (knex, Promise) {
  return knex.schema.createTable('expenses', function (t) {
    t.string('id', 26).notNullable().primary()
    t.timestamp('date').notNullable().index()
    t.string('category_id', 26).notNullable().references('id').inTable('expense_categories')
    t.string('employee_id', 26).notNullable().references('id').inTable('employees')
    t.text('tax_id').notNullable()
    t.text('description').notNullable()
    t.integer('amount').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('expenses')
}
