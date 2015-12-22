(function () {
    'use strict';

    var breezeImpl = require('./breeze-impl');

    var EntityQuery = breezeImpl.EntityQuery;
    var SequelizeQuery = breezeImpl.SequelizeQuery;
    var SequelizeSaveHandler = breezeImpl.SequelizeSaveHandler;
    var sequelizeManager = breezeImpl.sequelizeManager;

    exports.init = init;

    /////////////////

    function init(router) {
        router.get('/breeze/Metadata', function* () {
            var metadata = breezeImpl.getMetadata();
            this.body = metadata;
        });

        router.get('/breeze/:entity', function* () {
            var resourceName = this.params.entity;
            var entityQuery = EntityQuery.fromUrl(this.url, resourceName);

            var query = new SequelizeQuery(sequelizeManager, entityQuery);

            this.type = 'application/json';
            this.body = yield query.execute();
        });

        router.post('/breeze/SaveChanges', function* () {
            var saveHandler = new SequelizeSaveHandler(sequelizeManager, this.request);
            this.body = yield saveHandler.save();
        });
    }

})();
