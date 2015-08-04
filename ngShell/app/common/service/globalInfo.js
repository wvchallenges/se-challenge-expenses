(function() {
    'use strict';

    angular
        .module('app')
        .factory('globalInfo', [globalInfo]);
    
    function globalInfo() {
        var service = {
            //MVC
            apiUrl_upload_net: 'http://waveNetApi.azurewebsites.net/api/upload',
            apiUrl_fetch_net: 'http://waveNetApi.azurewebsites.net/api/upload',             

	        //NODE
            apiUrl_upload_node: 'https://lit-savannah-4000.herokuapp.com/api/upload',
            apiUrl_fetch_node: 'https://lit-savannah-4000.herokuapp.com/api/fetch'
        };

        init();
        return service;

        function init() {            
        }
    }
})();

