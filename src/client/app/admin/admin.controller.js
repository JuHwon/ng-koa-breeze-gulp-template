(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$state', 'logger', '_s'];

    /* @ngInject */
    function AdminController($state, logger, _s) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            getSubRoutes();

            if ($state.current.name.indexOf('.') < 0 && vm.subRoutes.length) {
                $state.go(vm.subRoutes[0].name);
            }

            logger.info('Activated Admin View');
        }

        function getSubRoutes() {
            vm.subRoutes = $state.get().filter(function(r) {
                return (r.name.match(/\./g) || '').length === 1 && _s.startsWith(r.name, 'admin.');
            }).sort(function(r1, r2) {
                return r1.settings.pos - r2.settings.pos;
            });
        }
    }
})();
