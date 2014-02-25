//import gulp
var gulp = require('gulp');

// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
 
///////////////////////////////////////
//               Tasks               //
///////////////////////////////////////

gulp.task('scripts', function() {
            //can specify order for deps
  var stream = gulp.src([/*'./src/scripts/lib.js',*/'./dev/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./prod/scripts/'));

  console.log(stream);
});

gulp.task('styles', function() {

  gulp.src(['./dev/styles/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./prod/styles/*.scss'));

});

gulp.task('tests', function() {

  gulp.src('./dev/spec/*.js')
    .pipe(jasmine());

});

///////////////////////////////////////
//        Default Build Script       //
///////////////////////////////////////

gulp.task('default', function(){

    //JS Compilation
    gulp.watch('./dev/scripts/*.js', ['scripts', 'tests']);

    //CSS Compilation
    gulp.watch('./dev/styles/*.scss', ['styles']);

});
