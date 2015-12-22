'use strict';

module.exports = (function() {
    var args = require('yargs').argv;
    var notify = require('gulp-notify');
    var browserSync = require('browser-sync');
    var config = require('./config');
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
    var port = process.env.PORT || config.defaultPort;

    var obj = {};

    /**
     * Inject files in a sorted sequence at a specified inject label
     * @param   {Array}  src   glob pattern for source files
     * @param   {String} label The label name
     * @param   {Array}  order glob pattern for sort order of the files
     * @returns {Stream} The stream
     */
    function inject(src, label, order) {
        var options = { read: false };
        if (label) {
            options.name = 'inject:' + label;
        }

        return $.inject(orderSrc(src, order), options);
    }
    obj.inject = inject;

    function errorhandler(title) {

        return notify.onError({
            title: title + ' error(s)',
            message: '<%= error.message %>'
        });
    }
    obj.errorHandler = errorhandler;

    /**
     * Order a stream
     * @param   {Stream} src   The gulp.src stream
     * @param   {Array}  order Glob array pattern
     * @returns {Stream} The ordered stream
     */
    function orderSrc (src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe($.if(order, $.order(order)));
    }

    /**
     * serve the code
     * --debug-brk or --debug
     * --nosync
     * @param  {Boolean} isDev      - dev or build mode
     * @param  {Boolean} specRunner - server spec runner html
     */
    function serve(isDev, specRunner) {
        var debugMode = '--debug';
        var nodeOptions = getNodeOptions(isDev);

        nodeOptions.nodeArgs = [debugMode + '=5858', '--harmony'];

        if (args.verbose) {
            console.log(nodeOptions);
        }

        return $.nodemon(nodeOptions)
            .on('restart', ['vet'], function(ev) {
                log('*** nodemon restarted');
                log('files changed:\n' + ev);
                setTimeout(function() {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({ stream: false });
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                log('*** nodemon started');
                startBrowserSync(isDev, specRunner);
            })
            .on('crash', function () {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                log('*** nodemon exited cleanly');
            });
    }

    function getNodeOptions(isDev) {
        return {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server]
        };
    }
    obj.serve = serve;

    /**
     * Start BrowserSync
     * --nosync will avoid browserSync
     */
    function startBrowserSync(isDev, specRunner) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting BrowserSync on port ' + port);

        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches sass, compiles it to css, browser-sync handles reload
        if (isDev) {
            gulp
                .watch(config.allSass, ['styles'])
                .on('change', changeEvent);
        } else {
            gulp
                .watch([].concat(config.allSass, config.js, config.html),
                       ['optimize', browserSync.reload])
                .on('change', changeEvent);
        }

        var options = {
            proxy: 'localhost:' + port,
            port: 3000,
            files: isDev ? [
                config.client + '**/*.*',
                '!' + config.allSass,
                config.temp + '**/*.css'
            ] : [],
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 0 //1000
        } ;
        if (specRunner) {
            options.startPath = config.specRunnerFile;
        }

        browserSync(options);
    }

    /**
     * When files change, log it
     * @param  {Object} event - event that fired
     */
    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    /**
     * Formatter for bytediff to display the size changes after processing
     * @param  {Object} data - byte data
     * @return {String} Difference in bytes, formatted
     */
    function bytediffFormatter(data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return data.fileName + ' went from '
            + (data.startSize / 1000).toFixed(2) + ' kB to '
            + (data.endSize / 1000).toFixed(2) + ' kB and is '
            + formatPercent(1 - data.percent, 2) + '%' + difference;
    }
    obj.bytediffFormatter = bytediffFormatter;

    /**
     * Format a number as a percentage
     * @param  {Number} num       Number to format as a percent
     * @param  {Number} precision Precision of the decimal
     * @return {String} Formatted perentage
     */
    function formatPercent(num, precision) {
        return (num * 100).toFixed(precision);
    }

    /**
     * Log a message or series of messages using chalk's blue color.
     * Can pass in a string, object or array.
     */
    function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }
    obj.log = log;

    return obj;
})();
