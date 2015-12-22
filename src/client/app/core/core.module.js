(function () {
    'use strict';

    angular.module('app.core', [
        'ngMaterial',
        'ngplus',

        'ui.router',

        'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'blocks.authentication',
        'blocks.loading',

        'app.data'
    ]);

})();
