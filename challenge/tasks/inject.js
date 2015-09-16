(function() {
    'use strict';

    var gulp = require('gulp'),
        $ = require('gulp-load-plugins')(),
        path = require('path');

    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks,
        exists = help.common.exists;

    var src = join(['resources', 'views', 'layout.blade.php']),
        pJS = join(['public','js']),
        allJS = join([pJS, 'all.js']),
        pCSS = join(['public','css']),
        allCSS = join([pCSS, 'all.css']),
        injectables = [allJS, allCSS];

    var dependencies = exists(allJS) ? [] : ['scripts'],
        dependencies = exists(allCSS) ? dependencies : ['styles'].concat(dependencies);


    gulp.task('inject', dependencies, function() {
        return gulp.src(src)
            .pipe($.inject(gulp.src(injectables, {read: false}), {ignorePath: 'public'}))
            .pipe(gulp.dest(path.dirname(src)));
    });
}());