(function() {
	'use strict';

	// process.env.DISABLE_NOTIFIER = true;

	var gulp = require('gulp'),
		sequence = require('run-sequence');

	require('require-dir')('./tasks');

	gulp.task('default', ['inject']);

	// require('require-dir')('./tasks/extensions');

		//mix.task('clean')

		// mix.bower('bower.json');

  //       mix.angular();

  //       mix.scripts([
  //           '../../../public/js/bower.js',
  //           '../../../public/js/angular.js'
  //       ]);

  //       mix.styles([
  //           '../../../public/css/bower.css'
  //       ]);
		// mix.version(['js/all.js', 'css/all.css']);
}());
