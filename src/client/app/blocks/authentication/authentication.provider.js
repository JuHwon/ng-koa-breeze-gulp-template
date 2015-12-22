(function () {
    'use strict';

    var serviceId = 'authentication';
    angular
        .module('blocks.authentication')
        .provider(serviceId, authenticationProvider);

    authenticationProvider.$inject = [];
    function authenticationProvider() {
        /* jshint validthis:true */

        var config = {
            // valid modes: 'optional', 'required', 'none'
            mode: 'optional'
        };
        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = Authentication;

        Authentication.$inject = ['$q', '$auth', '$http', 'logger'];

        /* @ngInject */
        function Authentication($q, $auth, $http, logger) {
            var user = null;

            var exports = {
                login: login,
                logout: logout,
                isLoggedIn: isLoggedIn,
                getCurrentUser: getCurrentUser,
                getMode: getMode
            };

            return exports;

            ////////////////

            /**
             * login user
             * @param   {Object}  data Contains login data(username, password)
             * @returns {Promise}
             */
            function login(data) {
                return $auth.login({
                        username: data.username,
                        password: data.password
                    })
                    .then(success)
                    .catch(error);

                /**
                 * success function of login -> set current user | show success message
                 * @param {Object} response [[Description]]
                 */
                function success(response) {
                    setCurrentUser(response.data.user);
                    logger.success('You have successfully logged in', response.data, serviceId);
                }

                /**
                 * error function of login -> reject Promise | show error message
                 * @param   {Object}   err error-code
                 * @returns {Promise}
                 */
                function error(err) {
                    logger.log(err);
                    var msg = err.status === 401 ? 'Wrong username or password.' : err.statusText;

                    err.message = msg;
                    logger.error(msg, err, serviceId);
                    return $q.reject(err);
                }
            }

            /**
             * logout -> call $auth logout function -> remove login-token
             * @returns {Promise}
             */
            function logout() {
                if (!isLoggedIn()) {
                    return;
                }
                return $auth.logout()
                    .then(success);

                /**
                 * success function get called if logout successfully
                 */
                function success() {
                    logger.info('You have been logged out.');
                }
            }

            /**
             * check if user is logged in -> called $auth.isAuthenticated
             * @returns {Promise}
             */
            function isLoggedIn() {
                return $auth.isAuthenticated();
            }

            /**
             * get Object of current user
             * @returns {Object} currentUser object
             */
            function getCurrentUser() {
                if (!user) {
                    setCurrentUser($auth.getPayload());
                }
                return user;
            }

            function setCurrentUser(currentUser) {
                if (currentUser) {
                    user = currentUser;
                    user.displayName = currentUser.firstName + ' ' + currentUser.lastName;
                }
            }

            function getMode() {
                return config.mode;
            }
        }
    }
})();
