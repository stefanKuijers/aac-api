


/*
   api-service
*/

(function() {
    'use strict';

    angular
        .module( 'aac.api' )
        .provider('Api', Api);

    // @ngInject
    function Api() {
        var config = {
            debug: false,
            protocol: 'http://',
            baseUri: 'localhost/api/'
        };

        // @ngInject
        var serviceConstruct = function( $http, $q  ) {
            var service     = this;
            service.baseUrl = config.protocol + config.baseUri;


            /*
                Public
            */
            service.call = function( params ) {
                return $http( {
                    method:  params.method || 'GET',
                    url:     service.baseUrl + (params.url || ''),
                    data:    parse( params.data )
                } ) .then( 
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

            function parse( data ) {
                if ( $http.defaults.headers.common['Content-Type'].match( 'application/x-www-form-urlencoded' ) ) {
                    var _data = '';

                    for (var i in data) {
                        _data += '&' + i + '=' + encodeURIComponent( data[i] );
                    }
                } else {
                    _data = data;
                }

                return _data;
            }

            return service
        }


        return {
            setConfig: function( key, value ) {
                config[ key ] = value;
            },
            $get: serviceConstruct
        };
        
    }
})();