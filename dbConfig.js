var knex = require('knex')(require('./knexfile')['development']),
bookshelf = require('bookshelf')(knex);

// Model Registry plugin: allow string table names instead of variables
bookshelf.plugin('registry');

module.exports = bookshelf;
