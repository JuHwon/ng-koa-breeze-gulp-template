(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('model', model);

    model.$inject = ['breeze', 'model.validation'];

    /* @ngInject */
    function model(breeze, modelValidation) {
        //Define the functions and properties to reveal.
        var entityNames = {
            user: 'User'
        };

        var exports = {
            configureMetadataStore: configureMetadataStore,
            createNullos: createNullos,
            entityNames: entityNames,
            extendMetadata: extendMetadata
        };

        return exports;

        ////////////////

        function configureMetadataStore(metadataStore) {
            registerUser(metadataStore);

            modelValidation.createAndRegister(entityNames);
        }

        function extendMetadata(metadataStore) {
            modelValidation.applyValidators(metadataStore);
        }

        function registerUser(metadataStore) {
            metadataStore.registerEntityTypeCtor(entityNames.user, User);

            function User() {
                this.isPartial = false;
            }

            Object.defineProperty(User.prototype, 'fullName', {
                get: function() {
                    return this.firstName + ' ' + this.lastName;
                }
            });
        }

        //create nullos for dropdown lists
        function createNullos(manager) {
            var unchanged = breeze.EntityState.Unchanged;

            createNullo(entityNames.user, {
                fullName: '[Select a user]'
            });

            function createNullo(entityName, values) {
                var initialValues = values ||
                    {
                        name: '[Select a ' + entityName.toLowerCase() + ']'
                    };
                return manager.createEntity(entityName, initialValues, unchanged);
            }
        }
    }
})();
