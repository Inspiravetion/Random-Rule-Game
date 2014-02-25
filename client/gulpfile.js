//import gulp
var gulp = require('gulp');

// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
 
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
            //can specify order for deps
  gulp.src([/*'./src/scripts/lib.js',*/'./dev/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./prod/scripts/'));
});


/**
 * Startup task watchers
 */
gulp.task('default', function(){

    //script compilation
    gulp.watch('./dev/scripts/*.js', ['scripts']);

});
