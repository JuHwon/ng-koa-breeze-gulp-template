'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var args = require('yargs').argv;
var config = require('./config');
var helper = require('./helper');

// Build angular template cache from the existing html templates
gulp.task('templatecache', ['clean-code'], function() {
    helper.log('Creating an AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.if(args.verbose, $.bytediff.start()))
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.if(args.verbose, $.bytediff.stop(helper.bytediffFormatter)))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));

});
