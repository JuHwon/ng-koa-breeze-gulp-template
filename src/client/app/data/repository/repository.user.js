(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('repository.user', RepositoryUser);

    RepositoryUser.$inject = ['breeze', 'model', 'AbstractRepository', 'logger'];

    /* @ngInject */
    function RepositoryUser(breeze, model, AbstractRepository, logger) {
        var entityName = model.entityNames.user;
        var EntityQuery = breeze.EntityQuery;
        var orderBy = 'firstName, lastName';
        var Predicate = breeze.Predicate;

        function Ctor(mgr) {
            this.entityName = entityName;
            this.orderBy = orderBy;
            this.manager = mgr;
            //Exposed data access functions
            this.create = create;
            this.getAll = getAll;
            this.getPartials = getPartials;
            this.getById = getById;
        }

        AbstractRepository.extend(Ctor);

        return Ctor;

        ////////////////

        function getPartials() {
            /*jshint validthis: true */
            var users;
            return EntityQuery.from(this.entityName)
                .select('id, firstName, lastName, username')
                .orderBy(this.orderBy)
                .toType('User')
                .using(this.manager).execute()
                .then(querySucceeded)
                .then(this._queryFailed);

            function querySucceeded(data) {
                users = data.results;
                logger.info('Retrieved [Users Partials] from remote data source', users.length);
                return users;
            }
        }

        function getAll() {
            /*jshint validthis: true */
            var users;
            return EntityQuery.from(this.entityName)
                .orderBy(this.orderBy)
                .using(this.manager).execute()
                .then(querySucceeded)
                .catch(this._queryFailed);

            function querySucceeded(data) {
                users = data.results;
                logger.info('Retrieved [Users] from remote data source', users.length);
                return users;
            }
        }

        function getById(id, forceRemote) {
            /*jshint validthis: true */
            return this._getById(entityName, id, forceRemote);
        }

        function create() {
            /*jshint validthis: true */
            return this.manager.createEntity(entityName);
        }
    }
})();
