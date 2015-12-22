(function (exports) {
    'use strict';

    var fs = require('fs');
    var breezeSequilize = require('breeze-sequelize');
    var path = require('path');
    var Promise = require('bluebird');
    var CryptoJS = require('crypto-js');
    var dbConf = require('config').get('database');

    var SequelizeManager = breezeSequilize.SequelizeManager;
    var SequelizeQuery = breezeSequilize.SequelizeQuery;
    var SequelizeSaveHandler = breezeSequilize.SequelizeSaveHandler;

    var breeze = breezeSequilize.breeze;
    var EntityQuery = breeze.EntityQuery;

    var dbConfig = {
        user: dbConf.user,
        password: dbConf.password,
        dbName: dbConf.dbName
    };

    var sequelizeOptions = {
        host: dbConf.host,
        dialect: dbConf.dialect,
        port: dbConf.port
    };

    if (dbConf.instanceName) {
        sequelizeOptions.dialectOptions = {
            instanceName: dbConf.instanceName
        };
    }

    var _sequelizeManager = createSequelizeManager();

    _sequelizeManager.authenticate();

    _sequelizeManager.sync(false /* createDb */)
        .then(seed)
        .then(function () {
            console.log('db init successful');
        });

    module.exports = {
        EntityQuery: EntityQuery,
        SequelizeSaveHandler: SequelizeSaveHandler,
        SequelizeQuery: SequelizeQuery,
        sequelizeManager: _sequelizeManager,
        getMetadata: getMetadata
    };

    ////////////////

    function seed() {
        var users = [
            {
                firstName: 'Admin',
                lastName: 'User',
                userName: 'Admin',
                email: 'admin@app.com',
                password: CryptoJS.MD5('Passw0rd').toString()
            }, {
                firstName: 'Test',
                lastName: 'User',
                userName: 'Test',
                email: 'test@app.com',
                password: CryptoJS.MD5('test').toString()
            }
        ];

        var promises = Promise.all([
            seedUsers()
        ]);

        return promises;

        function seedUsers() {
            var User = _sequelizeManager.models.User;
            return User.bulkCreate(users);
        }
    }

    function createSequelizeManager() {
        var metadata = getMetadata();
        var sm = new SequelizeManager(dbConfig, sequelizeOptions);
        sm.importMetadata(metadata);

        return sm;
    }

    var _metadata;
    function getMetadata() {
        return _metadata || (_metadata = readMetadata());
    }

    function readMetadata() {
        var filename = path.join(__dirname, 'Metadata.json');
        if (!fs.existsSync(filename)) {
            throw new Error('Unable to locate file: ' + filename);
        }
        var metadata = fs.readFileSync(filename, 'utf8');
        return JSON.parse(metadata);
    }

})(module.exports);
