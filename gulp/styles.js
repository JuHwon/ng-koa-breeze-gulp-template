'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var config = require('./config');

// compile the sass files to css
gulp.task('styles', ['clean-styles'], function() {
    // FIXME: Sass error handling
    // This is kind of weird because usually errors won't kill the watch
    // but for some brilliant reason sass does, also if you have a
    // notification you don't get errors to the console at all...
    var sassOptions = {
        indentWidth: 4,
        outputStyle: 'expanded',
        errorLogToConsole: true
    };

    return gulp.src(config.allSass)
        .pipe($.concat('styles.scss'))
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.sass(sassOptions))
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp));

});

/* Copy fonts
* @return {Stream}
*/
gulp.task('fonts', ['clean-fonts'], function() {
    //    helper.log('Copying fonts');
    //
    //    return gulp
    //        .src(config.fonts)
    //        .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function() {
    //    helper.log('Compressing and copying images');
    //
    //    return gulp
    //        .src(config.images)
    //        .pipe($.imagemin({optimizationLevel: 4}))
    //        .pipe(gulp.dest(config.build + 'images'));
});
