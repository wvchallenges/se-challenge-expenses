var config = require('./index.js');
var _ = require('lodash');
var glob = require('glob');
var path = require('path');

var assets = {
  lib: {
    "angular": "lib/angular/angular.js",
    "angular-route": "lib/angular-route/angular-route.js"
  },
  app: {
    "modules": "js/**/*.module.js",
    "components": "js/**/!(*.spec|*.mock).js"
  },
  tests: {
    "mocking": "lib/angular-mocks/angular-mocks.js",
    "tests": "js/**/*.spec.js"
  }
};

module.exports = {
  globs: function() {
    return assets;
  },
  js: function() {
    var files = [];
    _.each([assets.lib, assets.app], function(value, key) {
      _.forIn(value, function(value, key) {
        var globToGlob = path.join('public', value);
        var filesToAdd = glob.sync(globToGlob);
        files = files.concat(filesToAdd);
      });
    });
    return _.uniq(files);
  }
};
