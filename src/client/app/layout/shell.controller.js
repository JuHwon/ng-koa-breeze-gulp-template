(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    /* @ngInject */
    function ShellController($rootScope, $timeout, common) {
        var vm = this;
        var config = common.config;
        var logger = common.logger;
        var events = config.events;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = false;
        $rootScope.hideSlpash = false;

        vm.config = {
            title: config.appTitle
        };

        activate();

        ////////////////

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            $timeout(function() {
                $rootScope.hideSlpash = true;
            }, 1000);
        }

        function toggleSpinner(value) {
            vm.isBusy = value;
        }
    }
})();
