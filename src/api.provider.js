


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
            baseUri: 'localhost/api/',
            defaultHttpMethod: 'GET'
        };

        // @ngInject
        var serviceConstruct = function( $http, $q  ) {
            var service     = this;
            service.baseUrl = config.protocol + config.baseUri;


            /*
                Public
            *//*
                params.data only excepts javascript objects
            */
            service.call = function( params ) {
                var _method = params.method || config.defaultHttpMethod;

                return $http( {
                    method:  _method,
                    url:     service.baseUrl + (params.url || ''),
                    data:    parse( params.data, _method )
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

            function parse( data, method ) {
                var _data;

                // checks or we have set a content type header for the current method
                if (  $http.defaults.headers[ method.toLowerCase() ]['Content-Type'].match( 'application/x-www-form-urlencoded' ) ) {
                    _data = formUrlEncode( data );
                } else {
                    _data = data;
                }

                return _data;
            }

            function formUrlEncode(obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
                  
                for( name in obj ) {
                  value = obj[name];
                    
                  if( value instanceof Array ) {
                    for( i = value.length-1; i >= 0; i-- ) {
                      subValue = value[i];
                      fullSubName = name + '[' + i + ']';
                      innerObj = {};
                      innerObj[fullSubName] = subValue;
                      query += formUrlEncode( innerObj ) + '&';
                    }
                  } else if( value instanceof Object ) {
                    for( subName in value ) {
                      subValue = value[subName];
                      fullSubName = name + '[' + subName + ']';
                      innerObj = {};
                      innerObj[fullSubName] = subValue;
                      query += formUrlEncode( innerObj ) + '&';
                    }
                  } else if( value !== undefined && value !== null )
                    query += encodeURIComponent( name ) + '=' + encodeURIComponent( value ) + '&';
                }
                  
                return query.length ? query.substr( 0, query.length - 1 ) : query;
              };


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