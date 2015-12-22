(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('riTopBar', riTopBar);

    /* @ngInject */
    function riTopBar() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: TopBarController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'app/layout/ri-topbar.html',
            scope: {
                config: '='
            }
        };
        return directive;
    }

    TopBarController.$inject = ['$mdSidenav'];

    /* @ngInject */
    function TopBarController($mdSidenav) {
        var vm = this;

        vm.toggleSideNav = toggleSideNav;

        ///////////////

        function toggleSideNav() {
            $mdSidenav('left').toggle();
        }
    }
})();
