(function(){
	'use strict';

	var gulp = require('gulp'),
		$ = require('gulp-load-plugins')();

    gulp.task('install', function () {
        return gulp
            .src(['bower.json', 'package.json'])
            .pipe($.install());
    });
}());
