(function () {
    'use strict';
    angular
        .module('app.data')
        .factory('repositories', repositories);

    repositories.$inject = ['$injector'];

    /* @ngInject */
    function repositories($injector) {
        var manager;
        var exports = {
            getRepo: getRepo,
            init: init
        };

        return exports;

        ////////////////

        //called exclusively by dataservice
        function init(mgr) { manager = mgr; }

        // Get named Repository Ctor (by injection), new it
        function getRepo(repoName) {
            var fullRepoName = 'repository.' + repoName.toLowerCase();
            var Repo = $injector.get(fullRepoName);
            return new Repo(manager);
        }
    }
})();
