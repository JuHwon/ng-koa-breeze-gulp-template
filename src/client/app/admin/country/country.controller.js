(function() {
    'use strict';

    angular
        .module('app.admin.country')
        .controller('CountryAdminController', CountryAdminController);

    CountryAdminController.$inject = ['logger'];

    /* @ngInject */
    function CountryAdminController(logger) {
        var vm = this;
        vm.title = 'Country Administration';

        activate();

        ////////////////

        function activate() {
            logger.info('Activated Country Administraiton.');
        }
    }
})();
