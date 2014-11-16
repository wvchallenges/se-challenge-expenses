'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    less: {
      compile: {
        files: {
          'public/css/build.css': 'app/client/style/start.less'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'app/client/widgets',
          mainConfigFile: 'app/client/require.config.js',
          name: 'almond',
          include: ['start'],
          insertRequire: ['start'],
          optimize: 'none',
          out: 'public/js/build.js',
          wrap: true
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['requirejs', 'develop', 'delayed-livereload']
      },
      css: {
        files: ['app/**/*.css', 'app/**/*.less'],
        options: {
          livereload: reloadPort
        },
        tasks: ['less']
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['less', 'requirejs', 'develop', 'watch']);
};
