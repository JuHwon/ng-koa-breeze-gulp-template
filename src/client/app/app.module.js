(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.mainview',
        'app.secondview',
        'app.admin',
        'app.layout'
    ])
    .run(appRun);

    appRun.$inject = ['dataservice'];

    /* @ngInject */
    function appRun (dataservice) {
        dataservice.prime();
    }
})();
