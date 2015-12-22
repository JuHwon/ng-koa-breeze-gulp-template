(function() {
    'use strict';

    angular
        .module('app.secondview')
        .controller('SecondviewController', SecondviewController);

    SecondviewController.$inject = ['logger'];

    /* @ngInject */
    function SecondviewController(logger) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            logger.info('Acitvated Second View');
        }
    }
})();
