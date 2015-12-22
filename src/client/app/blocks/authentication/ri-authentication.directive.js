(function () {
    'use strict';

    angular
        .module('blocks.authentication')
        .directive('riAuth', riAuth);

    riAuth.$inject = ['authentication'];

    /* @ngInject */
    function riAuth(auth) {

        var templateUrl = auth.getMode() !== 'none'
            ? 'app/blocks/authentication/ri-authentication.html'
            : '';

        var directive = {
            bindToController: true,
            controller: AuthConrtoller,
            controllerAs: 'vm',
            restrict: 'EA',
            templateUrl: templateUrl,
            scope: {}
        };
        return directive;
    }

    AuthConrtoller.$inject = ['$mdDialog', 'logger', 'authentication'];

    /* @ngInject */
    function AuthConrtoller($mdDialog, logger, authentication) {
        var vm = this;

        vm.showLogin = showLogin;
        vm.isAuthenticated = isAuthenticated;
        vm.login = login;
        vm.logout = logout;
        vm.user = null;

        activate();

        /////////////////

        function activate() {
            _showIfRequired();
        }

        function showLogin(event) {
            return $mdDialog.show({
                templateUrl: '/app/blocks/authentication/ri-authentication.dialog.html',
                controller: 'LoginDialogController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                targetEvent: event
            }).then(login);

        }

        function isAuthenticated() {
            if (!vm.user) {
                serUser();
            }
            return authentication.isLoggedIn();
        }

        function login(data) {
            return authentication.login(data)
            .then(success)
            .catch(error);

            function success(response) {
                serUser();
            }

            function error(response) {
                showLogin();
            }
        }

        function logout() {
            vm.user = null;
            return authentication.logout()
                .then(success);

            function success() {
                _showIfRequired();
            }
        }

        function serUser() {
            if (authentication.getCurrentUser()) {
                vm.user = authentication.getCurrentUser().displayName;
            } else {
                vm.user = null;
            }
        }

        function _showIfRequired() {
            if (authentication.getMode() === 'required') {
                showLogin();
            }
        }

    }
})();
