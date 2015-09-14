(function() {
	'use strict';

	var gulp = require('gulp'),
        $ = require('gulp-load-plugins')();

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks,
        exists = help.common.exists;

    var ANGULAR = join(['resources','assets','angular']),
        ANGULAR_JS = join([ANGULAR, '**','*.js']),
        ANGULAR_CSS = join([ANGULAR, '**','*.css']),
        pJS = join(['public','js']),
        pCSS = join(['public','css']),
        destJS = pJS,
        destCSS = pCSS,
        bowerJS = join([pJS, 'bower.js']),
        nameJS = 'angular.js',
        nameCSS = 'angular.css';

	gulp.task('angular', exists(bowerJS) ? ['angular:css'] : ['angular:css', 'bower'], function() {
        return gulp
            .src(ANGULAR_JS)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.angularFilesort())
            .pipe($.concat(nameJS))
            .pipe($.ngAnnotate())
            .pipe($.if($.util.env.production, $.uglify(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(destJS));
    });

    gulp.task('angular:css', function() {
        return gulp
          .src(ANGULAR_CSS)
          .pipe($.if($.util.env.production, $.sourcemaps.init()))
          .pipe($.concat(nameCSS))
          .pipe($.if($.util.env.production, $.uglifycss(), $.util.noop()))
          .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
          .pipe(gulp.dest(destCSS));
    });
}());
