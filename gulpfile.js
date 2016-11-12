'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

/**
 * Run in Develop with auto-reload
 */
gulp.task('default', function() {
  nodemon({
    script: 'server/app',
    env: { 'NODE_ENV': 'development' },
    nodeArgs: ['--debug'],
  })
})