(function () {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Administration',
                    settings: {
                        pos: 10,
                        displayName: 'Administration',
                        icon: 'security'
                    }
                }
            }
        ];
    }
})();
