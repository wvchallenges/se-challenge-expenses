(function(){
	'use strict';

	var gulp = require('gulp'),
		del = require('del'),
		BUILD = 'public/build/',
		pCSS = 'public/css',
		pJS = 'public/js';

	gulp.task('clean', function(cb) {
		return del([
			 	BUILD,
		    	pCSS,
		    	pJS], cb);
	});
}());