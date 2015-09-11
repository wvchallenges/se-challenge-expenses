(function(){
  'use strict';

  var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

  var help = require('require-dir')('helpers'),
      join = help.common.joinChunks;

  var src = 'bower.json';
  var dest = 'public',
    destJS = join([dest, 'js']),
    destCSS = join([dest, 'css']);
  var prefix = 'bower';

  gulp.task('bower', ['bower:js','bower:css']);

  gulp.task('bower:js', function() {
    var filterJS = $.filter('**/*.js');

    return gulp
      .src(src)
      .pipe($.if($.util.env.prloduction, $.sourcemaps.init()))
      .pipe($.mainBowerFiles())
      .pipe(filterJS)
      .pipe($.concat(prefix+'.js'))
      .pipe($.if($.util.env.production, $.uglify()))
      .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
      .pipe(gulp.dest(destJS));
  });

  gulp.task('bower:css', function() {
    var filterCSS = $.filter('**/*.css');

    return gulp
      .src(src)
      .pipe($.if($.util.env.production, $.sourcemaps.init()))
      .pipe($.mainBowerFiles())
      .pipe(filterCSS)
      .pipe($.concat(prefix+'.css'))
      .pipe($.if($.util.env.production, $.uglifycss(), $.util.noop()))
      .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
      .pipe(gulp.dest(destCSS));
  });
}());
