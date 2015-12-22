(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('entityManagerFactory', entityManagerFactory);

    entityManagerFactory.$inject = ['breeze', 'model'];

    /* @ngInject */
    function entityManagerFactory(breeze, model) {
        // Identify the endpoint for the remote data service
        var serviceName = '/breeze/'; // breeze Web API controller

        breeze.core.config.initializeAdapterInstance('uriBuilder', 'json');
        // Convert properties between server-side PascalCase and client-side camelCase
        //breeze.NamingConvention.camelCase.setAsDefault();

        // Tell breeze not to validate when we attach
        // a newly created entity to any manager.
        new breeze.ValidationOptions({ validateOnAttach: false }).setAsDefault();

        var metadataStore = createMetadataStore();

        var exports = {
            newManager: newManager,
            serviceName: serviceName,
            metadataStore: metadataStore
        };

        return exports;

        ////////////////

        function newManager() {
            return new breeze.EntityManager({
                serviceName: serviceName,
                metadataStore: metadataStore
            });
        }

        function createMetadataStore() {
            var store = new breeze.MetadataStore();
            model.configureMetadataStore(store);
            return store;
        }

    }
})();
