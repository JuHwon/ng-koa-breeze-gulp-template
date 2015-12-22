module.exports = function (index) {
    function *pageNotFound(next) {
        var err;
        try {
            yield next;
        } catch (e) {
            // handle thrown 404 errors
            if (e.status !== 404) {
                throw e;
            }
            err = e;
        }

        if (404 !== this.status) {
            return;
        }

        //when path matches '/*' and not '/api/*' serve index
        if ((new RegExp(/\/*/)).test(this.path)
            && !(new RegExp(/\/api\/*/)).test(this.path)
            && !(new RegExp(/\/auth\/*/)).test(this.path)
            && !(new RegExp(/\/breeze\/*/)).test(this.path)) {
            this.status = 200;
            yield* this.fileServer.send(index);
            return;
        }

        // we need to explicitly set 404 here
        // so that koa doesn't assign 200 on body=
        this.status = 404;

        this.body = {
            status: 404,
            message: 'Page Not Found',
            description: (err ? err.message : 'API endpoint not found'),
            url: this.request.url
        };
    }
    return pageNotFound;
};
