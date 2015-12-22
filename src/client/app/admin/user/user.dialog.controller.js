(function() {
    'use strict';

    angular
        .module('app.admin.user')
        .controller('UserDialogController', UserDialogController);

    UserDialogController.$inject = ['$mdDialog', '$scope', 'common', 'dataservice'];

    /* @ngInject */
    function UserDialogController($mdDialog, $scope, common, dataservice) {
        var vm = this;
        var $rootScope = common.$rootScope;
        var logger = common.logger;
        var config = common.config;
        var isNewUser = vm.user === undefined;

        vm.title = isNewUser ? 'New User' : 'Edit User';
        vm.reject = reject; //close fn would throw jshint error???
        vm.save = save;
        vm.isSaving = false;
        vm.hasChanges = false;

        //vm.canSave property
        Object.defineProperty(vm, 'canSave', {
            get: canSave
        });

        function canSave() {
            return (isNewUser || vm.hasChanges) && !vm.isSaving;
        }

        activate();

        ////////////////

        function activate() {
            registerHasChanges();
            if (isNewUser) {
                vm.user = dataservice.user.create();
            }
        }

        function registerHasChanges() {
            $scope.$on(config.events.hasChangesChanged, function(event, data) {
                vm.hasChanges = data.hasChanges;
            });
        }

        function reject() {
            vm.user.entityAspect.rejectChanges();
            $mdDialog.cancel();
        }

        function save() {

            vm.isSaving = true;

            return dataservice.save([vm.user])
                .then(function(saveResult) {
                    vm.isSaving = false;
                    $mdDialog.hide(isNewUser ? vm.user : null);
                })
                .finally(function() {
                    vm.isSaving = false;
                });
        }

    }
})();
