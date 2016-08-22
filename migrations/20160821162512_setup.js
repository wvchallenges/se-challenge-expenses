exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses', function(table){
      table.increments('id').primary();
      table.date('date');
      table.string('category');
      table.string('employeeName');
      table.string('employeeAddress');
      table.string('description');
      table.float('preTaxAmount');
      table.string('taxName');
      table.float('taxAmount');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses')
  ]);
};
