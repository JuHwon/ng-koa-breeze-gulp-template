# ng-koa-breeze-gulp-template

**AngularJS / NodeJS Application**

> The structure of the application is influenced by the [HotTowel-Angular](https://github.com/johnpapa/generator-hottowel) and the [gulp-angular](https://github.com/Swiip/generator-gulp-angular) skeleton.

>The Application developed with [Brackets](http://brackets.io/). Useful extensions for Brackets can be found in the guide from [John Papa](http://www.johnpapa.net/my-recommended-brackets-extensions/).

>**More Extensions**
> - Material-AngularJS Code Hints (currently not compatible with AngularJS Code Hints)
> - SASSHints
> - Todo


## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

    > On linux you might have problems with `gulp.watch`. In this case check out these links: [GitHub Issue](https://github.com/gulpjs/gulp/issues/217) / [Stackoverflow](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)


## Configuration

For backend configuration we are using the [node-config](https://github.com/lorenwest/node-config) module. There is a config file `default.json` with some default configuration. You can add/overwrite your custom config e.g. with a `local.json` file. For more information visit the [wiki pages](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order). Please do **not** commit local configuration files.

** Location **

    /config
        default.json


## Running ng-koa-breeze-gulp-template Reporting

### Linting
- Run code analysis using `gulp vet`. This runs jshint, jscs.

### Tests
- Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
- Run the project with `gulp serve-dev`

- opens it in a browser and updates the browser with any files changes.

### Building the project
- Build the optimized project using `gulp build`
- This create the optimized code for the project and puts it in the build folder

### Running the optimized code
- Run the optimize project from the build folder with `gulp serve-build`

## Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp jshint`

    Runs jshint.

- `gulp jscs`

    Runs jscs.

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-fonts`

    Remove all fonts from the build folder

### Styles

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Inject Files

- `gulp wiredep`

    Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

- `gulp inject`

Wire up css into the html, after files are ready

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

- `gulp serve-dev --nosync`

    Serves the development code without launching the browser.

- `gulp serve-dev --debug`

    Launch debugger with node-inspector.

- `gulp serve-dev --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Building Production Code

- `gulp html`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp html` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

    Serve the optimized code from the build folder and manually launch the browser.

- `gulp serve-build --debug`

    Launch debugger with node-inspector.

- `gulp serve-build --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Bumping Versions

- `gulp bump`

    Bump the minor version using semver.
    ```
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --ver=1.2.3 // specific version
    ```

### TODO:

- `gulp fonts`

- `gulp images`



