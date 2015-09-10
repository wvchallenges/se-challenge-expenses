(function(){
	"use strict";

	var gulp = require('gulp'),
		del = require('del'),
		ASSETS = 'resources/assets/',
		BUILD = 'public/build/',
		pCSS = 'public/**/*.css',
		pJS = 'public/**/*.js',
		JS_ASSETS = ASSETS+'js/';

	gulp.task('clean', ['clean:angular', 'clean:bin']);

		gulp.task('clean:angular', function(cb) {
		    return del([
		    	JS_ASSETS+'bower.js',
                JS_ASSETS+'bower.css',
		    	JS_ASSETS+'**/*.map',
		    	], cb);
		});

		gulp.task('clean:bin',function(cb) {
			return del([
			 	BUILD,
		    	pCSS,
		    	pJS
		    	], cb);
		});
}());