(function () {
    'use strict';

    var core = angular.module('app.core');

    /////////////////

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.extendedTimeOut = 0;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.closeHtml = '<button><i class="mdi mdi-close"></i></button>';
    }

    //////////////////

    var events = {
        controllerStartActivate: 'controller.startActivate',
        controllerActivateSuccess: 'controller.activateSuccess',
        hasChangesChanged: 'dataservice.hasChangesChanged'
    };

    var config = {
        appErrorPrefix: '[App Error] ',
        appTitle: 'App Title',
        events: events
    };

    core.value('config', config);

    //////////////////

    core.config(configure);

    configure.$inject = [
        '$logProvider',
        'routerHelperProvider',
        'exceptionHandlerProvider',
        'authenticationProvider'
    ];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, authProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ': '
        });

        authProvider.configure({
            // valid modes: 'optional', 'required', 'none'
            mode: 'optional'
        });
    }

    ///////////////////

    core.config(themeConfig);

    themeConfig.$inject = ['$mdThemingProvider'];

    function themeConfig($mdThemingProvider) {

        var accentPalette = $mdThemingProvider.extendPalette('amber', {
            'contrastLightColors': ['500', '600', '700', '800', '900', 'A700']
        });

        $mdThemingProvider.definePalette('custom-amber', accentPalette);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('custom-amber', {
                'default': '500' // use shade 500 for default, and keep all other shades the same
            });
    }

    //////////////////

    // Configure the Breeze Validation Directive
    core.config(breezeDirectivesCfg);

    breezeDirectivesCfg.$inject = ['zDirectivesConfigProvider'];

    function breezeDirectivesCfg (cfg) {
        cfg.zValidateTemplate = '<span class="invalid"><i class="mdi mdi-alert"></i>'
            + '%error%</span>';

        cfg.zRequiredTemplate =
            '<span class="icon-asterisk-invalid z-required" title="Required">*</span>';
    }

})();
