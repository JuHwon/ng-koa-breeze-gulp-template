var app = require('koa')();
var router = require('koa-router')();
var favicon = require('koa-favicon');
var logger = require('koa-morgan');
var bodyParser = require('koa-bodyparser');
var path = require('path');
var serve = require('koa-static');
var four0four = require('./utils/404');
var requestTime = require('./utils/request-time');
var breezeApi = require('./breeze/breeze-api');
var auth = require('./auth/auth')(app);

var rootDir = path.join(__dirname, '../../');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV || 'dev';

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.use(requestTime('X-Response-Time'));
app.use(favicon(__dirname + '/favicon.ico'));

app.use(bodyParser());
app.use(logger.middleware('dev'));
app.use(router.routes());

breezeApi.init(router);
auth.init(router);

var index;
switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(serve(path.join(rootDir, './build')));

        index = './build/index.html';
        break;
    default:
        console.log('** DEV **');
        app.use(serve(path.join(rootDir, './src/client/')));
        app.use(serve(path.join(rootDir, './')));
        app.use(serve(path.join(rootDir, './tmp')));

        index = './src/client/index.html';
        break;
}

//Any deep link calls should return index.html handled by the four0four mw
app.use(require('koa-file-server')({
    root: rootDir,
    index: index
}));

app.use(four0four(index));

app.listen(port, function () {
    console.log('Koa server listening on port ' + port + '...');
    console.log('env = ' + app.env + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});
