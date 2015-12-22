
var breezeImpl = require('../breeze/breeze-impl'),
    LdapStrategy = require('passport-ldapauth').Strategy,
    sequelizeManager = breezeImpl.sequelizeManager,
    User = sequelizeManager.models.User;

module.exports = function (passport) {
    var config = require('config').get('ldap');
    var ldapConfig =  {
        server: {
            url: config.get('url'),
            bindDn: config.get('bindDn'),
            bindCredentials: config.get('bindCredentials'),
            searchBase: config.get('searchBase'),
            searchFilter: '(&(objectclass=user)(samaccountname={{username}}))',
            searchAttributes: ['sAMAccountName', 'givenName', 'sn', 'mail']
        }
    };

    passport.use(new LdapStrategy(ldapConfig, ldapAuthentication));
};

function ldapAuthentication(user, done) {
    if (user) {
        user = {
            id: null,
            userName: user.sAMAccountName,
            firstName: user.givenName,
            lastName: user.sn,
            email: user.mail
        };

        saveLdapDbUser(user, done);
    }
}

function saveLdapDbUser(user, done) {
    delete user.id;
    var sequelizeManager = breezeImpl.sequelizeManager;
    var User = sequelizeManager.models.User;

    User.findOrCreate({ where: { email: user.email }, defaults: user }).then(function(user) {
        if (user) {
            done(null, user[0].dataValues);
        }
    });
}
