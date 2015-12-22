/* jshint -W117, -W030 */
describe('repository.user', function() {

    var mockUser = mockData.getMockUser();

    beforeEach(function() {
        module('app.data', bard.fakeToastr);
        bard.inject('$httpBackend', 'dataservice');
    });

    beforeEach(function () {
        //mocking Metadata
        var mockedMetadata = mockData.getMockMetadata();
        $httpBackend.when('GET', '/breeze/Metadata').respond(200, mockedMetadata);
    });

    it('exists', function() {
        expect(dataservice.user).to.exist;
    });

    it('getAll should return a value', function () {
        $httpBackend.when('GET', /\/breeze\/User/).respond(200, mockUser);

        dataservice.user.getAll().then(function (data) {
            expect(data).to.exist;
        });
        $httpBackend.flush();
    });

    it('getPartials should return a value', function () {
        $httpBackend.when('GET', /\/breeze\/User/).respond(200, mockUser);

        dataservice.user.getPartials().then(function (data) {
            expect(data).to.exist;
        });
        $httpBackend.flush();
    });

    it('getById should return a value', function () {
        $httpBackend.when('GET', /\/breeze\/User/).respond(200, mockUser[0]);

        dataservice.user.getById(1, true).then(function(data) {
            expect(data).to.exist;
        });
        $httpBackend.flush();
    });

    it('getById should return a object', function () {
        $httpBackend.when('GET', /\/breeze\/User/).respond(200, mockUser[0]);

        dataservice.user.getById(1, true).then(function(data) {
            expect(typeof data).to.equal('object');
        });
        $httpBackend.flush();
    });
});
