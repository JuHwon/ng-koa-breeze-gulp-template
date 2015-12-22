(function () {
    'use strict';
    angular
        .module('blocks.loading')
        .factory('loading', loading);

    /* @ngInject */
    function loading($q) {
        var busyIndicatorMap = {};
        // the countMap is important to support multiple loading stars
        // with the same indicator
        var busyCountMap = {};
        var exports = {
            start: start,
            registerBusyIndicator: registerBusyIndicator,
            busyIndicatorRegistered: busyIndicatorRegistered
        };

        return exports;

        ////////////////

        function start(promises, identifier) {
            _setBusyStatus(identifier, true);
            return $q.all(promises)
                .then(success);

            function success() {
                _setBusyStatus(identifier, false);
            }
        }

        function registerBusyIndicator(identifier, scope) {
            busyIndicatorMap[identifier] = scope;
            busyCountMap[identifier] = 0;
        }

        function _setBusyStatus(identifier, status) {
            if (busyIndicatorMap[identifier]) {
                busyCountMap[identifier] += status ? 1 : -1;
                busyIndicatorMap[identifier].isBusy = busyCountMap[identifier] > 0;
            }
        }

        function busyIndicatorRegistered(identifier) {
            return busyIndicatorMap[identifier] !== undefined;
        }
    }
})();
