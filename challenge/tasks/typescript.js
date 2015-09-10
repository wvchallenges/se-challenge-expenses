(function(){
	'use strict';

	var gulp = require('gulp'),
		ts = require('gulp-typescript');

	src = './resources/assets/typescript/';
	dest = src;

    src += '**/*.ts';
    options = {
        sortOutput: true
    };

    gulp.task('typescript', function () {
        return gulp
        	.src(src)
            .pipe(ts(options))
            .pipe(gulp.dest(dest));
    });
}());
