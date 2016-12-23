'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./index.js');

module.exports = function(app) {
  app.use(bodyParser.json());

  var env = app.get('env');

  if ('production' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'dist')));
  }

  if ('development' === env) {
    app.use(express.static(path.join(config.root, 'dist')));
    app.use('/public', express.static(path.join(config.root, 'public')));
  }

};
