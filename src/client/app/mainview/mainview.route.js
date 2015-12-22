(function () {
    'use strict';

    angular
        .module('app.mainview')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mainview',
                config: {
                    url: '/',
                    templateUrl: 'app/mainview/mainview.html',
                    controller: 'MainviewController',
                    controllerAs: 'vm',
                    title: 'Main View',
                    settings: {
                        pos: 1,
                        displayName: 'Mainview',
                        icon: 'code-array'
                    }
                }
            }
        ];
    }
})();
