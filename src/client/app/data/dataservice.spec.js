/* jshint -W117, -W030 */
describe('dataservice', function () {

    beforeEach(function () {
        module('app.data', bard.fakeToastr);
        bard.inject('$httpBackend', '$rootScope', 'dataservice', 'breeze');
    });

    beforeEach(function () {

        //mocking metadata
        var mockedMetadata = mockData.getMockMetadata();
        $httpBackend.when('GET', '/breeze/Metadata').respond(200, mockedMetadata);
    });

    it('exists', function () {
        expect(dataservice).to.exist;
    });

    it('breeze saveErrorExtensions exists', function() {
        expect(breeze.saveErrorMessageService).to.exist;
    });

    it('save should return a value', function() {
        $httpBackend.when('GET', '/breeze/SaveChanges').respond(200);
        expect(dataservice.save()).to.exist;
    });

    it('save should return a promise and execute cb', function() {
        $httpBackend.when('GET', '/breeze/SaveChanges').respond(200);
        var callback = sinon.spy();
        dataservice.save()
            .then(callback);
        $rootScope.$apply();
        expect(callback).to.have.been.called;
    });

});
