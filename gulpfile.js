     
var gulp         = require('gulp')
var path         = require('path')
var less         = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps   = require('gulp-sourcemaps')
var minifyCSS    = require('gulp-clean-css')
var rename       = require('gulp-rename')
var concat       = require('gulp-concat')
var uglify       = require('gulp-uglify')
var connect      = require('gulp-connect')
var open         = require('gulp-open')
var merge        = require('merge-stream');

var Settings = {
  LESS_TOOLKIT         : 'main',
  DIST_TOOLKIT         : 'main.js'
};

var Paths = {
  HERE                 : './',
  WEB_CSS              : './web/css',
  WEB_JS               : './web/js',
  WEB_FONTS            : './web/fonts',
  FONT_SOURCES         : [
      './node_modules/bootstrap/dist/fonts/glyphicons.*',
  ],
  DIST                 : 'dist',
  DIST_TOOLKIT_JS      : 'dist/'+Settings.DIST_TOOLKIT,
  LESS_TOOLKIT_SOURCES : './app/Resources/less/'+Settings.LESS_TOOLKIT+'*',
  LESS                 : './app/Resources/less/**/**',
  CSS                  : [  
      // './app/Resources/public/css/font.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
  ],
  JS                   : [
      './node_modules/jquery/dist/jquery.min.js',

      './node_modules/bootstrap/js/transition.js',
      './node_modules/bootstrap/js/alert.js',
      // './node_modules/bootstrap/js/affix.js',
      // './node_modules/bootstrap/js/button.js',
      // './node_modules/bootstrap/js/carousel.js',
      // './node_modules/bootstrap/js/collapse.js',
      // './node_modules/bootstrap/js/dropdown.js',
      // './node_modules/bootstrap/js/modal.js',
      // './node_modules/bootstrap/js/tooltip.js',
      // './node_modules/bootstrap/js/popover.js',
      // './node_modules/bootstrap/js/scrollspy.js',
      // './node_modules/bootstrap/js/tab.js',

      './app/Resources/public/js/*',
  ],
  JS_APP                : [
      './src/AppBundle/Resources/public/js/app.js',
  ]
};

gulp.task('default', ['css-min', 'js-min', 'fonts'])

gulp.task('watch', function () {
  gulp.watch(Paths.LESS, ['less-min']);
  gulp.watch(Paths.JS,   ['js-min']);
});

gulp.task('docs', ['server'], function () {
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9001/docs/'}))
});

gulp.task('server', function () {
  connect.server({
    root: 'docs',
    port: 9001,
    livereload: true
  })
});

gulp.task('css', function () {
  var cssStream = gulp.src(Paths.CSS)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())   
    .pipe(concat("css-files.css"));
    
  var lessStream = gulp.src(Paths.LESS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat("less-files.css"));
    
  return merge(cssStream, lessStream)
    .pipe(concat(Settings.LESS_TOOLKIT+".css"))
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST));
});

gulp.task('css-min', ['css'], function () {

  var cssStream = gulp.src(Paths.CSS)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())   
    .pipe(concat("css-files.css"));
    
  var lessStream = gulp.src(Paths.LESS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat("less-files.css"));
    
  return merge(cssStream, lessStream)
    .pipe(concat(Settings.LESS_TOOLKIT+".css"))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_CSS));
});

gulp.task('js', function () {
  return gulp.src(Paths.JS.concat(Paths.JS_APP))
    .pipe(concat(Settings.DIST_TOOLKIT))
    .pipe(gulp.dest(Paths.DIST))
});

gulp.task('js-dev', function () {
  return gulp.src(Paths.JS)
    .pipe(concat(Settings.DIST_TOOLKIT))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.dev'
    }))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_JS))
});

gulp.task('js-min', ['js-dev', 'js'], function () {
  return gulp.src(Paths.DIST_TOOLKIT_JS)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(Paths.DIST))
    .pipe(gulp.dest(Paths.WEB_JS))
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src(Paths.FONT_SOURCES)
    .pipe(gulp.dest(Paths.WEB_FONTS));
});
