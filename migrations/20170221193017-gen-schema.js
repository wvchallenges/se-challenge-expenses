'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('expenses', {
    id: { type: 'serial', primaryKey: true },
    date: 'date',
    category: 'string',
    employee_name: 'string',
    employee_address: 'string',
    expense_description: 'text',
    pre_tax_amount: 'decimal',
    tax_name: 'string',
    tax_amount: 'decimal'
  });
};

exports.down = function(db) {
  return db.dropTable('expenses');
};

exports._meta = {
  "version": 1
};
