(function () {
    'use strict';

    angular
        .module('blocks.loading')
        .directive('busyIndicator', busyIndicator);

    /* @ngInject */
    function busyIndicator() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            templateUrl: 'app/blocks/loading/busy-indicator.html',
            bindToController: true,
            controller: BusyIndicatorController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                isBusy: '=',
                showTitle: '=?',
                title: '=?',
                identifier: '@'
            }
        };
        return directive;
    }

    /* @ngInject */
    function BusyIndicatorController(config, loading) {
        var vm = this;

        activate();

        //////////////////

        function activate() {
            setDefaultValues();

            if (angular.isDefined(vm.identifier)) {
                loading.registerBusyIndicator(vm.identifier, vm);
                vm.isBusy = false;
            }
        }

        function setDefaultValues() {
            if (!angular.isDefined(vm.showTitle)) {
                vm.showTitle = false;
            }

            if (!angular.isDefined(vm.isBusy)) {
                vm.isBusy = true;
            }

            if (!angular.isDefined(vm.title)) {
                vm.title = config.appTitle;
            }
        }
    }
})();
