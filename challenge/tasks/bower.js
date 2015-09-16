(function(){
  'use strict';

  var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path'),
    bowerFiles = require('bower-files')();

  var help = require('require-dir')('helpers'),
      join = help.common.joinChunks;

  var dest = 'public',
    destJS = join([dest, 'js']),
    destCSS = join([dest, 'css']),
    prefix = 'bower';

  gulp.task('bower', ['bower:js', 'bower:css']);

  gulp.task('bower:js', function() {
    return gulp
      .src(bowerFiles.ext('js').files)
      .pipe($.if($.util.env.prloduction, $.sourcemaps.init()))
      .pipe($.concat(prefix+'.js'))
      .pipe($.if($.util.env.production, $.uglify()))
      .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
      .pipe(gulp.dest(destJS));
  });

  gulp.task('bower:css', function() {
    return gulp
      .src(bowerFiles.ext('css').files)
      .pipe($.if($.util.env.production, $.sourcemaps.init()))
      .pipe($.concat(prefix+'.css'))
      .pipe($.if($.util.env.production, $.uglifycss(), $.util.noop()))
      .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
      .pipe(gulp.dest(destCSS));
  });
}());
