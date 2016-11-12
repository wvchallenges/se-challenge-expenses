/**
 * Database configuration application file
 */

'use strict'

const promise = require('bluebird')

var options = {
  // Initialization Options
  promiseLib: promise
}

// Setup Postgres connection
const config = require('./config/environment')
const pgp = require('pg-promise')(options)
const connectionString = config.pg.uri
const db = pgp(connectionString)


module.exports = db