(function(){
    'use strict';

    var jshint = require('gulp-jshint'),
        gulp = require('gulp');


    var help = require('require-dir')('helpers'),
        join = help.common.joinChunks;

    var src = src || join(['resources','assets', 'js','**','*.js']);
    gulp.task('jshint', function() {
        return gulp.src(src)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
}());