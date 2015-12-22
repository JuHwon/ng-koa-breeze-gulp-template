/* jshint -W117, -W030 */
describe('blocks.loading', function() {

    beforeEach(function() {
        module('blocks.loading');
        bard.inject('$q', '$compile', '$rootScope', 'loading');
    });

    //beforeEach

    it('loading service exist', function() {
        expect(loading).to.exist;
    });

    it('test busy-indicator should not be registered', function() {
        expect(loading.busyIndicatorRegistered('test')).to.be.false;
    });

    describe('test busy-indicator', function() {
        var controller;

        beforeEach(function() {
            var el = angular.element('<busy-indicator identifier="test"></busy-indicator>');
            $compile(el)($rootScope.$new());
            $rootScope.$apply();
            controller = el.controller('busyIndicator');
        });

        it('should be registered', function() {
            expect(loading.busyIndicatorRegistered('test')).to.be.true;
        });

        it('start(..) should alter busy indicators busy status', function() {

            loading.start([$q.when()], 'test');
            expect(controller.isBusy).to.be.true;

            $rootScope.$apply();
            expect(controller.isBusy).to.be.false;
        });

        it('busy indicators should stay busy when one of many start(..) calls is finished', function() {
            var defer1 = $q.defer();
            var defer2 = $q.defer();

            loading.start([defer1.promise], 'test');
            loading.start([defer2.promise], 'test');
            expect(controller.isBusy).to.be.true;

            defer1.resolve();
            $rootScope.$apply();
            expect(controller.isBusy).to.be.true;
        });

        it('busy indicators should not be busy after multiple finished start(..) calls', function() {
            var defer1 = $q.defer();
            var defer2 = $q.defer();

            loading.start([defer1.promise], 'test');
            loading.start([defer2.promise], 'test');
            expect(controller.isBusy).to.be.true;

            defer1.resolve();
            defer2.resolve();
            $rootScope.$apply();
            expect(controller.isBusy).to.be.false;
        });

    });

});
