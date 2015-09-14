(function() {
	'use strict';

	var gulp = require('gulp'),
        $ = require('gulp-load-plugins')()
        
    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks,
        exists = help.common.joinChunks;

    var pCSS = join(['public','css']),
        src = [join([pCSS, 'bower.css']), join([pCSS, 'angular.css'])],
        dest = pCSS,
        name = 'all.css';

	gulp.task('styles', exists(src) ? ['scripts'] : ['scripts', 'angular'], function() {
        return gulp
            .src(src)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.concat(name))
            .pipe($.if($.util.env.production, $.uglifycss(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
