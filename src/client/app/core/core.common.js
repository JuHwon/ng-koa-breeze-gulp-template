(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('common', common);

    /* @ngInject */
    function common($q, $rootScope, config, logger, loading) {
        var exports = {
            $q: $q,
            $rootScope: $rootScope,
            $broadcast: broadcast,
            config: config,
            logger: logger,
            activateController: activateController
        };

        return exports;

        ////////////////

        function broadcast() {
            $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function activateController(promises, busyIndicatorId, controllerId) {
            broadcast(config.events.controllerStartActivate);
            return loading.start(promises, busyIndicatorId)
                .then(success);

            function success() {
                var data = {
                    controllerId: controllerId,
                    busyIndicatorId: busyIndicatorId
                };
                broadcast(config.events.controllerActivateSuccess, data);
            }
        }
    }
})();
