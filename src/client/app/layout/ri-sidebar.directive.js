(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('riSidebar', riSidebar);

    riSidebar.$inject = [];

    /* @ngInject */
    function riSidebar() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: SidebarController,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: 'app/layout/ri-sidebar.html',
            scope: {}
        };
        return directive;

    }

    SidebarController.$inject = ['$state', 'routerHelper', '_s', '$mdSidenav'];

    /* @ngInject */
    function SidebarController($state, routerHelper, _s, $mdSidenav) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        vm.isCurrentOrChild = isCurrentOrChild;
        vm.navigate = navigate;

        activate();

        ////////////////

        function activate() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function(r) {
                return r.settings && r.settings.pos && r.name.indexOf('.') < 0;
            }).sort(function(r1, r2) {
                return r1.settings.pos - r2.settings.pos;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }

            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName
                ? 'current'
            : '';
        }

        function isCurrentOrChild(route) {
            if (!route.name || !$state.current || !$state.current.name) {
                return '';
            }

            var menuName = route.name;
            return $state.current.name === menuName
                || _s.startsWith($state.current.name, menuName + '.')
                ? 'current'
            : '';
        }

        function navigate(route) {
            $state.go(route.name);
            $mdSidenav('left').close();
        }
    }
})();
