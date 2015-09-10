(function() {
	'use strict';

	var gulp = require('gulp'),
        gutil = require('gulp-util'),
        gif = require('gulp-if'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;


	gulp.task('scripts', ['angular'], function() {
        var src = [join(['public','js','bower.js']), join(['public','js','angular.js'])];
        var dest = join(['public','js']);
        var name = 'all.js';

        return gulp
            .src(src, {read: false})
            // .pipe(gif(gutil.env.production, $.sourcemaps.init()))
            .pipe(concat(name))
            .pipe(gif(gutil.env.production, uglify(), gutil.noop()))
            // .pipe($.if(gutil.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
