'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

var all = {
  env: process.env.NODE_ENV,

  root: path.normalize(__dirname + '/..'),

  port: process.env.PORT || 3000

};

// Export the config object based on the NODE_ENV
// ==============================================
// module.exports = _.merge(
//   all,
//   require('./' + process.env.NODE_ENV + '.js') || {});

module.exports = all;
