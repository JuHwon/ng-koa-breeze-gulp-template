/* jshint -W117, -W030 */
describe('SidebarController', function() {
    var controller;
    var views = {
        mainview: 'app/mainview/mainview.html'
    };

    var states = [{
        state: 'mainview',
        config: {
            url: '/',
            templateUrl: 'app/mainview/mainview.html',
            controller: 'MainviewController',
            controllerAs: 'vm',
            title: 'Main View',
            settings: {
                pos: 1,
                content: 'Mainview'
            }
        }
    }, {
        state: 'secondview',
        config: {
            url: '/secondview',
            templateUrl: 'app/secondview/secondview.html',
            controller: 'SecondviewController',
            controllerAs: 'vm',
            title: 'Second View',
            settings: {
                pos: 2,
                content: 'Second View'
            }
        }
    }, {
        state: 'mainview.sub',
        config: {
            url: '/sub',
            templateUrl: 'app/mainview/mainview.html',
            controller: 'MainviewController',
            controllerAs: 'vm',
            title: 'Sub View'
        }
    }];

    beforeEach(function() {
        module('app.layout', bard.fakeToastr);
        bard.inject('$compile', '$rootScope', '$state', '$location', 'routerHelper');
    });

    beforeEach(function () {
        routerHelper.configureStates(states, '/');

        var el = angular.element('<ri-sidebar></ri-sidebar>');
        $compile(el)($rootScope.$new());
        $rootScope.$apply();
        controller = el.controller('riSidebar');
    });

    it('should have isCurrent() for / to return `current`', function () {
        $location.path('/');
        expect(controller.isCurrent($state.current)).to.equal('current');
    });

    it('should have isCurrent() for non route not return `current`', function () {
        $location.path('/invalid');
        expect(controller.isCurrent({
            title: 'invalid'
        })).not.to.equal('current');
    });

    it('navRoutes should be defined', function () {
        expect(controller.navRoutes).to.be.defined;
    });

    it('should have set main navRoutes to an array with correct length', function () {
        var mainNavRoutes = states.filter(function(state) {
            return state.state.indexOf('.') < 0;
        });
        expect(controller.navRoutes).to.have.length(mainNavRoutes.length);
    });

    it('should change current state onTabSelected', function() {
        controller.navigate($state.get('secondview'));
        $rootScope.$apply();
        expect($state.current.name).to.be.equal('secondview');
    });

    it('should have isCurrentOrChild for child return `current`', function() {
        $location.path('/sub');
        var isCurrentOrChild = controller.isCurrentOrChild($state.get('mainview'));
        expect(isCurrentOrChild).to.be.equal('current');
    });

    it('should have isCurrentOrChild for non child not return `current`', function() {
        $location.path('/sub');
        var isCurrentOrChild = controller.isCurrentOrChild({ name: 'invalid.sub' });
        expect(isCurrentOrChild).not.to.be.equal('current');
    });
});
