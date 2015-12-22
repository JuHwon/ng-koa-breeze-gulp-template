/* jshint -W117, -W030 */
describe('AdminController', function () {
    var controller;

    beforeEach(function () {
        module('app.admin', bard.fakeToastr);
        bard.inject('$controller', '$state', '_s');
    });

    beforeEach(function () {
        controller = $controller('AdminController');
    });

    it('all subRoutes are set', function () {
        var subStates = $state.get().filter(function (state) {
            return _s.startsWith(state.name, 'admin.')
                && state.name.match(/\./g).length === 1;
        });
        expect(controller.subRoutes).to.have.length(subStates.length);
    });
});
