/* jshint -W117, -W030 */
describe('authentication', function() {

    beforeEach(function() {
        module('blocks.authentication', bard.fakeToastr);
        bard.inject('$httpBackend', '$rootScope', 'authentication', 'logger');
    });

    afterEach(function() {
        window.localStorage.clear();
    });

    it('should exist', function() {
        expect(authentication).to.exist;
    });

    it('should start unauthenticated', function() {
        expect(authentication.isLoggedIn()).to.equal(false);
    });

    it('should login', function() {
        $httpBackend.when('POST', '/auth/login').respond(200, {
            token: 'SomeToken'
        });

        authentication.login({
            username: 'test',
            password: 'test'
        });

        $httpBackend.flush();

        expect(authentication.isLoggedIn()).to.equal(true);
    });

    it('login should fail', function() {
        $httpBackend.when('POST', '/auth/login').respond(401);

        authentication.login({
            username: 'test',
            password: 'test'
        });

        $httpBackend.flush();

        expect(authentication.isLoggedIn()).to.equal(false);
    });

    it('should logout', function() {
        $httpBackend.when('POST', '/auth/login').respond(200, {
            token: 'SomeToken'
        });

        authentication.login({
            username: 'test',
            password: 'test'
        });

        $httpBackend.flush();

        expect(authentication.isLoggedIn()).to.equal(true);

        authentication.logout();

        expect(authentication.isLoggedIn()).to.equal(false);
    });

    it('should get Current User', function() {
        $httpBackend.when('POST', '/auth/login').respond(200, {
            token: 'SomeToken',
            user: {
                username: 'test'
            }
        });

        authentication.login({
            username: 'test',
            password: 'test'
        });

        $httpBackend.flush();

        expect(authentication.getCurrentUser().username).to.equal('test');
    });

    it('should call Success logger', function() {
        var spy = sinon.spy(logger, 'info');

        $httpBackend.when('POST', '/auth/login').respond(200, {
            token: 'SomeToken'
        });
        authentication.login({
            username: 'test',
            password: 'test'
        });
        $httpBackend.flush();

        authentication.logout();
        $rootScope.$apply();

        expect(logger.info).to.have.been.called;
        expect(spy.withArgs('You have been logged out.')).to.have.been.called;

    });
});
