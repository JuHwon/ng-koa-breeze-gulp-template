(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('riSubNav', riSubNav);

    riSubNav.$inject = ['$state'];

    /* @ngInject */
    function riSubNav($state) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: SubNavController,
            controllerAs: 'vm',
            restrict: 'E',
            templateUrl: 'app/layout/ri-subnav.html',
            scope: {
                routes: '='
            }
        };
        return directive;
    }

    SubNavController.$inject = ['$state'];

    /* @ngInject */
    function SubNavController($state) {
        var vm = this;
    }
})();
