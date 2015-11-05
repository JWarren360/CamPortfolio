// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inlineCss = require('gulp-inline-css');
var minifyHTML = require('gulp-minify-html');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./building/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./building/js/*.js')
        .pipe(concat('perfmatters.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('perfmatters.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

//inline css
gulp.task('inline', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
    return gulp.src('./building/index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest(''))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(''));
});


// Watch Files For Changes
//gulp.task('watch', function() {
//    gulp.watch('js/*.js', ['lint', 'scripts']);
    //gulp.watch('scss/*.scss', ['sass']);
//});

// Default Task
gulp.task('default', ['lint', 'scripts', 'inline']);