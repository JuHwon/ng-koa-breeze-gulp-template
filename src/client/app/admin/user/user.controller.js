(function() {
    'use strict';

    var controllerId = 'UserAdminController';
    angular
        .module('app.admin.user')
        .controller(controllerId, UserAdminController);

    /* @ngInject */
    function UserAdminController($mdDialog, $scope, _, common, dataservice) {
        var vm = this;
        var logger = common.logger;
        vm.title = 'User Administration';
        vm.users = [];

        vm.showEditDialog = showEditDialog;
        vm.deleteUser = deleteUser;

        activate();

        ////////////////

        function activate() {
            common.activateController([getUsers()], 'subnav');
            registerDestroy();
            logger.info('Activated User Administration.');
        }

        function getUsers() {
            return dataservice.user.getAll()
                .then(function(users) {
                    vm.users = users;
                    logger.success('Got some users.');
                });
        }

        function registerDestroy() {
            $scope.$on('$desotry', function() {
                dataservice.cancel();
            });
        }

        function showEditDialog(event, user) {

            $mdDialog.show({
                templateUrl: 'app/admin/user/user.dialog.html',
                controller: 'UserDialogController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                targetEvent: event,
                locals: {
                    user: user
                },
                bindToController: true
            })
            .then(success);

            function success(newUser) {
                vm.users.push(newUser);
            }
        }

        function deleteUser(event, user) {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title(user.fullName + ' (' + user.userName + ')')
                .content('You really want to delete that user?')
                .ariaLabel('Confirm Delete User')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(event);

            $mdDialog.show(confirm)
                .then(confirmDelete);

            function confirmDelete() {
                dataservice.markDeleted(user);
                dataservice.save().then(success, fail);

                function success() {
                    vm.users = _.without(vm.users, user);
                }

                function fail() {
                    dataservice.cancel();
                }
            }
        }
    }
})();
