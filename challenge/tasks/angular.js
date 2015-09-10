(function() {
	'use strict';

	var gulp = require('gulp'),
		angularFilesort = require('gulp-angular-filesort'),
        ngAnnotate = require('gulp-ng-annotate'),
        gutil = require('gulp-util'),
        gif = require('gulp-if'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;


	gulp.task('angular', ['bower'], function() {
        var src = join(['resources','assets','angular', '**','*.js']);
        var dest = join(['public','js']);
        var name = 'angular.js';
            return gulp
                .src(src)
                // .pipe(gif(gutil.env.production, $.sourcemaps.init()))
                .pipe(angularFilesort())
                .pipe(concat(name))
                .pipe(ngAnnotate())
                .pipe(gif(gutil.env.production, uglify(), gutil.noop()))
                // .pipe($.if(gutil.env.production, $.sourcemaps.write('.')))
                .pipe(gulp.dest(dest));
    });
}());
