(function () {
    'use strict';

    var serviceId = 'model.validation'    ;
    angular
        .module('app.data')
        .factory(serviceId, modelValidation);

    modelValidation.$inject = ['breeze', 'logger'];

    /* @ngInject */
    function modelValidation(breeze, logger) {
        var entityNames;
        var Validator = breeze.Validator;
        var requireReferenceValidator;
        var service = {
            applyValidators: applyValidators, // called by the model
            createAndRegister: createAndRegister
        };

        return service;

        ////////////////

        function createAndRegister(eNames) {
            entityNames = eNames;
            // Step 1: create it
            requireReferenceValidator = createRequireReferenceValidator();
            // Step 2: Tell breeze about it
            Validator.register(requireReferenceValidator);
            // Step 3: Later on, we'll apply it
            logger.info('Validators created and registered', null, serviceId);
        }

        function applyValidators(metadataStore) {
            applyRequireReferenceValidators(metadataStore);
            applyEmailValidators(metadataStore);
            logger.info('Validators applied', null, serviceId);
        }

        function createRequireReferenceValidator() {
            var name = 'requireReferenceEntity';
            var ctx = {
                messageTemplate: 'Missing %displayName%',
                isRequired: true
            };
            var val = new Validator(name, valFunction, ctx);
            return val;

            function valFunction(value) {
                return value ? value.id !== 0 : false;
            }
        }

        function applyEmailValidators(metadataStore) {
            var entityType = metadataStore.getEntityType(entityNames.user);
            entityType.getProperty('email').validators
                .push(Validator.emailAddress());
        }

        function applyRequireReferenceValidators(metadataStore) {

            //////////// EXAMPLE ///////////////////////////////////////
            // we actually dont have models which require a reference //
            // this is an example how it should get implemented       //
            ////////////////////////////////////////////////////////////

            //the navigation properties which to validate
            /*var navigations = ["reference1", "reference2"];

            var entityType = metadataStore.getEntityType(entityNames.something);

            navigations.forEach(function(propertyName) {
                entityType.getProperty(propertyName).validators
                    .push(requireReferenceValidator);
            });*/
        }
    }
})();
