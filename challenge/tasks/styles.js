(function() {
	'use strict';

	var gulp = require('gulp'),
        gutil = require('gulp-util'),
        gif = require('gulp-if'),
        uglifycss = require('gulp-uglifycss'),
        concat = require('gulp-concat');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;


	gulp.task('styles', function() {
        var src = [join(['public','css','bower.css'])];
        var dest = join(['public','css']);
        var name = 'all.css';

        return gulp
            .src(src, {read: false})
            // .pipe(gif(gutil.env.production, $.sourcemaps.init()))
            .pipe(concat(name))
            .pipe(gif(gutil.env.production, uglifycss(), gutil.noop()))
            // .pipe($.if(gutil.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
