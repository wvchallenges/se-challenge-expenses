module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL || {
    database: 'wave_challenge',
    user: 'wave_challenge',
    password: 'wave_challenge'
  },
  pool: {min: 2, max: 10},
  migrations: {
    tableName: 'migrations',
    directory: './migrations'
  }
}
