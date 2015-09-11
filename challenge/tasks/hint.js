(function(){
    'use strict';

    var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var src = join(['resources','assets', 'js','**','*.js']);
    gulp.task('jshint', function() {
        return gulp.src(src)
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
    });
}());