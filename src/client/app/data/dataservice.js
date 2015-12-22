(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['common', 'breeze', 'entityManagerFactory', 'repositories', 'model'];

    /* @ngInject */
    function dataservice(common, breeze, emFactory, repositories, model) {
        var $q = common.$q;
        var logger = common.logger;
        var $broadcast = common.$broadcast;
        var config = common.config;
        var manager = emFactory.newManager();
        var repoNames = ['user'];

        var primePromise;

        var service = {
            prime: prime,
            save: save,
            cancel: cancel,
            markDeleted: markDeleted
            //Repositories to be added on demand:
            //  user
        };

        init();

        return service;

        ////////////////

        function init() {
            repositories.init(manager);
            defineLazyLoadedRepos();
            setupEventForHasChangesChanged();
        }

        function defineLazyLoadedRepos() {
            //define es5 property
            repoNames.forEach(function(repoName) {
                Object.defineProperty(service, repoName, {
                    configurable: true, // we will redefine this property in getter
                    get: function() {
                        //The 1st time the repo is request via the repositories service
                        var repo = repositories.getRepo(repoName);
                        //rewrite this property so the repo wont requested again
                        Object.defineProperty(service, repoName, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        function save(entities) {
            return manager.saveChanges(entities)
                .then(saveSucceeded)
                .catch(saveFailed);

            function saveSucceeded(result) {
                logger.success('Saved data.', result);
            }

            function saveFailed(error) {
                var msg = 'Save failed.' + error.message
                    + breeze.saveErrorMessageService.getErrorMessage(error);
                error.message = msg;
                logger.error(msg, error);
                throw error;
            }
        }

        function cancel() {
            if (manager.hasChanges()) {
                manager.rejectChanges();
                logger.info('Canceled changes');
            }
        }

        function markDeleted(entity) {
            return entity.entityAspect.setDeleted();
        }

        function setupEventForHasChangesChanged() {
            manager.hasChangesChanged.subscribe(function(eventArgs) {
                var data = { hasChanges: eventArgs.hasChanges };
                // send the message (the ctrl receives it)
                $broadcast(config.events.hasChangesChanged, data);
            });
        }

        function prime() {
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.all([getLookups()])
                .then(extendMetadata)
                .then(success);
            return primePromise;

            function extendMetadata() {
                var metadataStore = manager.metadataStore;

                registerResourceNames(metadataStore);
                model.extendMetadata(metadataStore);

            }

            function registerResourceNames(metadataStore) {

                var types = metadataStore.getEntityTypes();
                types.forEach(function(type) {
                    if (type instanceof breeze.EntityType) {
                        set(type.shortName, type);
                    }
                });

                function set(resourceName, entityName) {
                    metadataStore.setEntityTypeForResourceName(resourceName, entityName);
                }
            }

            function success() {
                logger.success('Primed the data');
            }
        }

        function getLookups() {
            //TODO: impl lookups here
            return $q.all([fetchMetadata()]);

            function fetchMetadata() {
                return manager.fetchMetadata();
            }
        }

    }
})();
