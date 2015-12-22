(function () {
    'use strict';

    angular
        .module('app.admin.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin.user',
                config: {
                    url: '/user',
                    templateUrl: 'app/admin/user/user.html',
                    controller: 'UserAdminController',
                    controllerAs: 'vm',
                    title: 'User Administration',
                    settings: {
                        pos: 1,
                        displayName: 'User',
                        icon: 'account'
                    }
                }
            }
        ];
    }
})();
