(function(){
	'use strict';

	var gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		ASSETS = 'resources/assets/',
		JS_ASSETS = ASSETS+'js/',
		CSS_ASSETS = ASSETS+'css/';

	gulp.task('sync', function() {
	    browserSync.init({
	        server: {
	            baseDir: "public"
	        },
	        port: 8000
	    });

	    gulp.watch([
	    	JS_ASSETS+'**/*.js', 
	    	CSS_ASSETS+'**/*.css'
	    	], ['default'])
	    gulp
	    	.watch(['resources/views/**/*.blade'])
	    	.on('change', browserSync.reload)
	});
}());
