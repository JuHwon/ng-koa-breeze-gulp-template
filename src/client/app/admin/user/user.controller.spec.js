/* jshint -W117, -W030 */
describe('UserAdminController', function() {
    var controller;
    var scope;

    var users = [{
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        userName: 'Joe'
    }];

    beforeEach(function() {
        module('app.admin.user', bard.fakeToastr);
        bard.inject('$controller', '$q', '$rootScope');
    });

    beforeEach(function() {
        var dataservice = {
            user: {
                getAll: function() {
                    return $q.when(users);
                }
            }
        };
        scope = $rootScope.$new();

        controller = $controller('UserAdminController', {
            dataservice: dataservice,
            $scope: scope
        });
    });

    it('should exist', function() {
        expect(controller).to.exist;
    });

    it('should have users variable defined', function() {
        expect(controller.users).to.exist;
    });

    it('should have empty users array before activation', function() {
        expect(controller.users).to.have.length(0);
    });

    ////////////

    describe('after activation', function() {

        beforeEach(function() {
            $rootScope.$apply();
        });

        it('should have mocked users', function() {
            expect(controller.users).to.have.length(users.length);
        });
    });
});
