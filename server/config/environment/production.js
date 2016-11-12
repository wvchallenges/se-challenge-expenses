'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            8080,

  // Postgres connection options
  pg: {
    uri:    process.env.PG_URL ||
            'postgres://localhost:5432/expenses'
  }
};