


/*
   api-service
*/

(function() {
    'use strict';

    angular
        .module( 'aac.api' )
        .service('API', API);

    /** @ngInject */
    function API( $http, $q, Config ) {
        var service     = this;
        service.baseUrl = Config.api.protocol + Config.api.baseUri;


        /*
            Public
        */
        service.call = function( params ) {
            return $http( {
                method:  params.method || 'GET',
                url:     service.baseUrl + params.url,
                headers: params.headers || undefined
            }, jsonToPost( params.data ) || undefined )
                .then( 
                    params.resolve || angular.noop,
                    params.reject  || reject,
                    params.notify  || notify
                );
        };


        /*
            Private
        */
        function reject( response ) {
            console.log( 'reject', response );
        }

        function notify( response ) {
            console.log( 'notify', response );
        }

        function jsonToPost( json ) {
            var _post = '';

            for (var i in json) {
                _post += '&' + i + '=' + encodeURIComponent( json[i] );
            }

            return _post;
        }
    }
})();