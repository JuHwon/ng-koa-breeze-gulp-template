(function() {
    'use strict';

    angular
        .module('app.mainview')
        .controller('MainviewController', MainviewController);

    MainviewController.$inject = ['logger'];

    /* @ngInject */
    function MainviewController(logger) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            logger.info('Acitvated Main View');
        }
    }
})();
