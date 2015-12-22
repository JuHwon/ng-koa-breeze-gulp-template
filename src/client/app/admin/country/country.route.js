(function () {
    'use strict';

    angular
        .module('app.admin.country')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin.country',
                config: {
                    url: '/country',
                    templateUrl: 'app/admin/country/country.html',
                    controller: 'CountryAdminController',
                    controllerAs: 'vm',
                    title: 'Country Administration',
                    settings: {
                        pos: 2,
                        displayName: 'Country',
                        icon: 'earth'
                    }
                }
            }
        ];
    }
})();
