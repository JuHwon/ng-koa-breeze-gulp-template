(function () {
    'use strict';

    var passport = require('koa-passport');
    var jwt = require('koa-jwt');
    var secret = require('config').get('jwt.token');

    module.exports = function(app) {
        app.use(passport.initialize());

        require('./passport-ldap')(passport);
        require('./passport-local')(passport);

        return {
            init: init
        };
    };

    function init (router) {
        router.post('/auth/login', function* (next) {
            var ctx = this;

            yield passport.authenticate(
                ['ldapauth', 'local'],
                authCb
            );

            function* authCb(err, user, info) {
                if (err) {
                    throw err;
                }
                if (user === false) {
                    ctx.status = 401;
                    ctx.body = {
                        success: false
                    };
                } else {
                    yield ctx.login(user, { session: false });
                    var token = jwt.sign(user, secret);
                    ctx.body = {
                        token: token,
                        user: user
                    };
                }
            }
        });
    }

})();
