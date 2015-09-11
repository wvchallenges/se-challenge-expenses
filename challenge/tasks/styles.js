(function() {
	'use strict';

	var gulp = require('gulp'),
        $ = require('gulp-load-plugins')();
        // gutil = require('gulp-util'),
        // gif = require('gulp-if'),
        // uglifycss = require('gulp-uglifycss'),
        // concat = require('gulp-concat');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var pCSS = join(['public','css']),
        src = [join([pCSS, 'bower.css'])],
        dest = pCSS,
        name = 'all.css';

	gulp.task('styles', function() {
        return gulp
            .src(src)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.concat(name))
            .pipe($.if($.util.env.production, $.uglifycss(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
