/* global toastr:false, moment:false, _:false, s: false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', _)
        .constant('_s', s); //underscore.strings

    // remove s from window scope because i dont like a global var s
    delete window.s;
})();
