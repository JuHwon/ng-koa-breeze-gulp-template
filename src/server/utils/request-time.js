module.exports = function requestTime(headerName) {
    return function *(next) {
        var start = new Date();
        yield next;
        var ms = new Date() - start;
        this.set(headerName, ms + 'ms');
    };
};
