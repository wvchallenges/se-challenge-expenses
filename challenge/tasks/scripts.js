(function() {
    'use strict';

    var gulp = require('gulp'),
        $ = require('gulp-load-plugins')();

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks,
        exists = help.common.exists;

    var pJS = join(['public', 'js']),
        bowerJS = join([pJS, 'bower.js']),
        angularJS = join([pJS, 'angular.js']),
        src = [bowerJS, angularJS],
        dest = pJS,
        name = 'all.js';

    var angularExists = exists(angularJS),
        bowerExists = exists(bowerJS),
        dependencies = angularExists 
            ? (bowerExists 
                    ? null
                    : ['bower'])
            : ['angular']; 

	gulp.task('scripts', dependencies, function() {
        return gulp
            .src(src)
            .pipe($.if($.util.env.production, $.sourcemaps.init()))
            .pipe($.concat(name))
            .pipe($.if($.util.env.production, $.uglify(), $.util.noop()))
            .pipe($.if($.util.env.production, $.sourcemaps.write('.')))
            .pipe(gulp.dest(dest));
    });
}());
