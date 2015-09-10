(function() {
    'use strict';

    var gulp = require('gulp'),
        inject = require('gulp-inject'),
        path = require('path');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var src = join(['resources', 'views', 'layout.blade.php']);
    var injectables = [join(['public','js', 'all.js']),
            join(['public','css', 'all.css'])];

    gulp.task('inject', ['styles', 'scripts'], function() {
        return gulp.src(src)
            .pipe(inject(gulp.src(injectables, {read: false})))
            .pipe(gulp.dest(path.dirname(src)));
    });
}());