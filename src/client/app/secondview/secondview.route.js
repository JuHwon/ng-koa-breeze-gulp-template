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
                state: 'secondview',
                config: {
                    url: '/secondview',
                    templateUrl: 'app/secondview/secondview.html',
                    controller: 'SecondviewController',
                    controllerAs: 'vm',
                    title: 'Second View',
                    settings: {
                        pos: 2,
                        displayName: 'Second View',
                        icon: 'cube-outline'
                    }
                }
            }
        ];
    }
})();
