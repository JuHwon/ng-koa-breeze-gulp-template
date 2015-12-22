var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./config');
var helper = require('./helper');

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function() {
    helper.log('Wiring the bower dependencies into the html');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    // Only include stubs if flag is enabled
    var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(helper.inject(js, '', config.jsOrder))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    helper.log('Wire up css into the html, after files are ready');

    return gulp
        .src(config.index)
        .pipe(helper.inject(config.css))
        .pipe(gulp.dest(config.client));
});
