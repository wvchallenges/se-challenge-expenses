(function() {
	'use strict';

	var gulp = require('gulp'),
        $ = require('gulp-load-plugins')();

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

	gulp.task('angular', function() {
        var src = join(['resources','assets','angular', '**','*.js']);
        var dest = join(['public','js']);
        var name = 'angular.js';

        return gulp
            .src(src)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.angularFilesort())
            .pipe($.concat(name))
            .pipe($.ngAnnotate())
            .pipe($.if($.util.env.production, $.uglify(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
