'use strict';

var gulp = require('gulp');
var config = require('./config');
var helper = require('./helper');
var args = require('yargs').argv;

/**
 * Create a visualizer report
 */
gulp.task('plato', function(done) {
    helper.log('Analyzing source with Plato');
    helper.log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
    helper.log('Running Plato');

    var plato = require('plato');
    var glob = require('glob');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = config.report + '/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (args.verbose) {
            helper.log(overview.summary);
        }
        if (done) { done(); }
    }
}
