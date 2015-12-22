/* jshint -W117, -W030 */
describe('UserDialogController', function() {
    var controller;
    var scope;

    beforeEach(function() {
        module('app.admin.user', bard.fakeToastr);
        bard.inject('$controller', '$q', '$rootScope', 'config');
    });

    beforeEach(function() {
        var dataservice = {
            user: {
                create: function() {
                }
                //todo: save
            }
        };
        scope = $rootScope.$new();
        controller = $controller('UserDialogController', {
            $scope: scope,
            dataservice: dataservice
        });
    });

    it('should exist', function() {
        expect(controller).to.exist;
    });

    ////////////

    describe('after activation', function() {
        beforeEach(function() {
            $rootScope.$apply();
        });

        //TODO: impl after activation tests
    });
});
