const path = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/expenses',
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.join(__dirname, '/server/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/server/db/seeds')
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: process.env.POOL_MIN,
      max: process.env.POOL_MAX
    },
    migrations: {
      directory: path.join(__dirname, '/server/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/server/db/seeds')
    },
  },
};
