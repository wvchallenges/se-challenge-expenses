(function() {
    angular
        .module('app')
        .controller('ChallengeController', ['dataService', '$scope', 'Upload', challengeController]);    
    
    function challengeController(dataService, $scope, Upload) {
        var vm = this;   
        vm.uploading = false;
        vm.fetching = false;
        vm.serviceMode = 1;
        
        vm.fetch = function() {
            vm.fetching = true;
            dataService.fetch(vm.serviceMode,
                function(data) {
                    vm.result = data;                    
                    vm.fetching = false;
                }, 
                function(err) {
                    console.log(err);
                    vm.fetching = false;
                });             
        };
        
        $scope.$watch('file', function () {
            vm.result = [];
            
            if ($scope.file)
            {
                vm.uploading = true;
                dataService.upload(vm.serviceMode, $scope.file,
                    function() {
                        console.log('OK');
                        vm.uploading = false;
                    }, 
                    function() {
                        console.log('Error');
                        vm.uploading = false;
                    });            
            }
        });        
    }
})();