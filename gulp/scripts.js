'use strict';

var gulp = require('gulp');
//var path = require('path');

var $ = require('gulp-load-plugins')();

var config = require('./config');
var helper = require('./helper');

// js hint check code style and formating
gulp.task('jshint', function() {
    return gulp.src(config.allJs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .on('error', helper.errorHandler('JSHINT'));
});

// js code style checker
gulp.task('jscs', function() {
    return gulp.src(config.allJs)
        .pipe($.jscs())
        .on('error', helper.errorHandler('JSCS'));
});

gulp.task('vet', ['jscs', 'jshint'], function() {});

// Annotate and "compile" js files and move them to dist
//gulp.task('scripts', ['jshint', 'jscs'], function() {
//    gulp.src([
//        path.join(config.paths.src, 'app/app.js'),
//        path.join(config.paths.src, 'app/app.*.js'),
//        path.join(config.paths.src, 'app/**.js')
//    ])
//        .pipe($.plumber()) // exit gracefully if something fails after this
//        .pipe($.ngAnnotate())
//        .pipe(gulp.dest(config.paths.temp));
//});
