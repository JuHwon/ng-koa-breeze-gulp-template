(function () {
    'use strict';

    angular.module('app.data', [
        'breeze.angular',
        'breeze.directives',

        // order is important because
        // breeze.directives registers zDirectivesConfigProvider for core config
        'app.core'
    ]);

})();
