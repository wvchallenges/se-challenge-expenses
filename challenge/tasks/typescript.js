(function(){
	'use strict';

	var gulp = require('gulp'),
		$ = require('gulp-load-plugins')();

	var src = './resources/assets/typescript/';
	var dest = src;

    src += '**/*.ts';
    var options = {
        sortOutput: true
    };

    gulp.task('typescript', function () {
        return gulp
        	.src(src)
            .pipe($.typescript(options))
            .pipe(gulp.dest(dest));
    });
}());
