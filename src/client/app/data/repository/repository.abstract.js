(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('AbstractRepository', AbstractRepository);

    AbstractRepository.$inject = ['$q', 'breeze', 'logger'];

    /* @ngInject */
    function AbstractRepository($q, breeze, logger) {
        var EntityQuery = breeze.EntityQuery;

        //Abstract repo gets its derived object's
        function Ctor() {
            this.isLoaded = false;
        }

        Ctor.extend = function(repoCtor) {
            repoCtor.prototype = new Ctor();
            repoCtor.prototype.constructor = repoCtor;
        };

        Ctor.prototype._getById = _getById;
        Ctor.prototype._areItemsLoaded = _areItemsLoaded;
        Ctor.prototype._queryFailed = _queryFailed;
        Ctor.prototype._setIsPartialTrue = _setIsPartialTrue;
        //TODO: mby add Ctor.prototype.logger = logger ?
        //TODO: mby add Ctor.prototype.$q = $q ?

        return Ctor;

        ////////////////

        function _areItemsLoaded(value) {
            //TODO: impl _areItemsLoaded
        }

        function _queryFailed(error) {
            var msg = 'Error retrieving data.' + error.message;
            logger.error(msg, error);
            throw error;
        }

        function _getAllLocal(resource, ordering) {
            /* jshint validthis: true */
            return EntityQuery.from(resource)
                .orderBy(ordering)
                .using(this.manager)
                .executeLocally();
        }

        function _getById(entityName, id, forceRemote) {
            /* jshint validthis: true */
            var self = this;
            var manager = self.manager;
            if (!forceRemote) {
                //check cache first
                var entity = manager.getEntityByKey(entityName, id);
                //TODO: create isPartial property
                if (entity && !entity.isPartial) {
                    logger.success(
                        'Retrieved [' + entityName
                        + ' id:' + entity.id + ' from cache.', entity
                    );
                    if (entity.entityAspect.entityState.isDeleted()) {
                        entity = null; // hide entity marked-for-delete
                    }
                    return $q.when(entity);
                }
            }

            //Hit the server
            //It was not found in cache, so let's query for it.
            return manager.fetchEntityByKey(entityName, id)
                .then(querySucceeded)
                .catch(self._queryFailed);

            function querySucceeded(data) {
                entity = data.entity;
                if (!entity) {
                    logger.warning('Could not find [' + entityName + '] id:' + id, null);
                    return null;
                }
                entity.isPartial = false;
                logger.success(
                    'Retrieved [' + entityName
                    + ' id:' + entity.id + ' from remote data source.', entity
                );
                return entity;
            }

        }

        function _setIsPartialTrue(entities) {
            for (var i = entities.length; i--;) {
                entities[i].isPartial = true;
            }
            return entities;
        }

    }
})();
