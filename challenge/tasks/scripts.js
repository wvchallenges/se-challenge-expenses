(function() {
	'use strict';

	var gulp = require('gulp'),
        $ = require('gulp-load-plugins')();

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

	gulp.task('scripts', function() {
        var pJS = join(['public', 'js']);
        var src = [join([pJS, 'bower.js']), join([pJS, 'angular.js'])];
        var dest = pJS;
        
        var name = 'all.js';

        return gulp
            .src(src)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.concat(name))
            .pipe($.if($.util.env.production, $.uglify(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
