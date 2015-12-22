(function() {
    'use strict';

    angular
        .module('blocks.authentication')
        .controller('LoginDialogController', LoginDialogController);

    LoginDialogController.$inject = ['$mdDialog', 'authentication', 'logger'];

    /* @ngInject */
    function LoginDialogController($mdDialog, authentication, logger) {
        var vm = this;

        vm.authenticate = false;
        vm.username = null;
        vm.password = null;
        vm.login = login;
        vm.forgotPassword = forgotPassword;
        vm.cancel = cancel;

        vm.canLogin = canLogin;
        vm.canClose = canClose;

        activate();

        ////////////////

        function canLogin() {
            return vm.username && vm.password;
        }

        function canClose() {
            return authentication.getMode() !== 'required';
        }

        function activate() {

        }

        function login() {
            if (vm.username && vm.password) {
                $mdDialog.hide({
                    username: vm.username,
                    password: vm.password
                });
            }
        }

        function forgotPassword() {

        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
