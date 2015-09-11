(function() {
	'use strict';

	var gulp = require('gulp'),
		sequence = require('run-sequence');

	require('require-dir')('./tasks');

	gulp.task('default', function(callback) {
	  sequence(['bower:js', 'bower:css'],
	  			'angular',
	  			['scripts', 'styles'],
	  			'inject',
	              callback);
	});
}());
