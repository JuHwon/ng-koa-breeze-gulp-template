
var breezeImpl = require('../breeze/breeze-impl'),
    LocalStrategy = require('passport-local').Strategy,
    CryptoJS = require('crypto-js'),
    sequelizeManager = breezeImpl.sequelizeManager,
    User = sequelizeManager.models.User;

module.exports = function (passport) {
    passport.use(new LocalStrategy(dbAuthentication));
};

function dbAuthentication(username, password, done) {
    password = CryptoJS.MD5(password).toString();

    var userObj = User.findOne({
        where: {
            userName: username,
            password: password
        },
        attributes: ['id', 'firstName', 'lastName', 'userName', 'email']
    }).then(function(user) {
        if (user) {
            done(null, user.dataValues);
        } else {
            done(null, false, { message: 'Invalid username/password' });
        }
    }).catch(function(error) {
        done(null, false, { message: 'something went terribly wrong' });
    });
}

