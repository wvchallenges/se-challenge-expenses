(function(){
	'use strict';

	var gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		del = require('del'),
		path = require('path');

	var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var BUILD = join(['public', 'build']),
		pCSS = join(['public', 'css']),
		pJS = join(['public', 'js']),
		allJS = join([pJS, 'all.js']),
		allCSS = join([pCSS, 'all.css']),
		bowerCSS = join([pCSS, 'bower.css']),
		bowerJS = join([pJS, 'bower.js']),
		angularJS = join([pJS, 'angular.js']),
		angularCSS = join([pCSS, 'angular.css']),
		layout = join(['resources', 'views', 'layout.blade.php']);

	gulp.task('clean:bower', ['clean:bower:js', 'clean:bower:css']);
	gulp.task('clean:angular', ['clean:angular:js', 'clean:angular:css']);

	gulp.task('clean:bower:js', function(cb) {
		return del([bowerJS, bowerJS+'.map'], cb);
	});

	gulp.task('clean:bower:css', function(cb) {
		return del([bowerCSS, bowerCSS+'.map'], cb);
	});

	gulp.task('clean:angular:js', ['clean:bower:js'], function(cb){
		return del([angularJS, angularJS+'.map'], cb);
	});

	gulp.task('clean:angular:css', ['clean:bower:css'], function(cb){
		return del([angularCSS, angularCSS+'.map'], cb);
	});

	gulp.task('clean:scripts', ['clean:angular:js'], function(cb) {
		return del([allJS, allJS+'.map'], cb);
	});

	gulp.task('clean:styles', ['clean:angular:css'], function(cb) {
		return del([allCSS, allCSS+'.map'], cb);
	});

	gulp.task('clean', ['clean:scripts', 'clean:styles']);
}());