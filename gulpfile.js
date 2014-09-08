var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    awspublish = require('gulp-awspublish'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    stylish = require('jshint-stylish'),
    minifyCSS = require('gulp-minify-css'),
    fs = require('fs');

gulp.task('style', function () {
    gulp.src('src/style/*.less')
        .pipe(less({
            paths: [ '.', 'lib' ]
        }))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('scripts', function() {
    gulp.src(['src/script/lib/*.js','src/script/*.js'],
        {
            base: 'src/script/'
        })
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('copy', function() {
    gulp.src(['src/*.html'], {base: 'src/'})
        .pipe(gulp.dest('.'));

    gulp.src(['src/img/*'], {base: 'src/'})
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['copy', 'style', 'scripts']);