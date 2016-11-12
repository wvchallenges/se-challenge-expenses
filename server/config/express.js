/**
 * Express configuration
 */

'use strict'

const express = require('express')
const compression = require('compression')
const fileUpload = require('express-fileupload')

module.exports = function(app) {
  app.use(compression())
  app.use(fileUpload())
  app.use(express.static('public'))
}