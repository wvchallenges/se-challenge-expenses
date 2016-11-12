/**
 * Main application file
 */

'use strict'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('express')
const config = require('./config/environment')

// Connect to database
const db = require('./db')

// Setup server
const app = express()
const server = require('http').createServer(app)
require('./config/express')(app)
require('./routes')(app)

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

// Expose app
exports = module.exports = app
