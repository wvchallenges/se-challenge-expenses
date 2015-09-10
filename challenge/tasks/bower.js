(function(){
  'use strict';

  var gulp = require('gulp'),
      mainBowerFiles = require('gulp-main-bower-files'),
      _ = require('underscore'),
      filter = require('gulp-filter'),
      merge = require('gulp-merge'),
      uglifycss = require('gulp-uglifycss'),
      gutil = require('gulp-util'),
      gif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var src = 'bower.json';
    var dest = 'public/';
    var prefix = 'bower';

    gulp.task('bower', function() {
        var filterJS = filter('**/*.js'),
            filterCSS = filter('**/*.css');

        var js = gulp
            .src(src)
            // .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe(mainBowerFiles())
            .pipe(filterJS)
            .pipe(concat(prefix+'.js'))
            .pipe(gif(gutil.env.production, uglify()))
            // .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest+'js'));

        var css = gulp
            .src(src)
            // .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe(mainBowerFiles())
            .pipe(filterCSS)
            .pipe(concat(prefix+'.css'))
            .pipe(gif(gutil.env.production, uglifycss(), gutil.noop()))
            // .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest+'css'));

        return merge(js, css);
    });
}());
