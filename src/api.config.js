


/*
   api-config
*/

(function() {
    'use strict';

    angular
        .module( 'aac.api' )
        .config( apiConfig )
        .constant( 
            'Config', {
                debug: false,
                api: {
                    protocol: 'http://',
                    baseUri: 'localhost/api/'
                }
            }
        )
    ;

    /** @ngInject */
    function apiConfig( $httpProvider ) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Accept']       = '*/*';
    }
    
})();