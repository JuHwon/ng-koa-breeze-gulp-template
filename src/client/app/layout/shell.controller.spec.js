/* jshint -W117, -W030 */
describe('ShellController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.layout', bard.fakeToastr);
        bard.inject('$controller', '$rootScope', '$timeout');
    });

    beforeEach(function () {
        controller = $controller('ShellController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Shell controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        it('should show splash screen', function () {
            expect($rootScope.hideSlpash).to.be.false;
        });

        it('should hide splash screen after timeout', function (done) {
            $timeout(function() {
                expect($rootScope.hideSlpash).to.be.true;
                done();
            }, 1000);
            $timeout.flush();
        });
    });
});
