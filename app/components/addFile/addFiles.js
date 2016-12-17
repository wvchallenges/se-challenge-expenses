// Create controller for addFiles view

// Create module, require angular ui router and config dependencies
angular.module('app.addFiles', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
        // Create /addfiles url for view, connect to template view and connect the backend controller
        $stateProvider.state('addFiles', {
            url: '/addfiles',
            templateUrl: 'components/addFile/addFiles.html',
            controller: 'FileController'
        });
        // otherwise go to /index
        $urlRouterProvider.otherwise('/index');
    }])
    // Require FileController and state dependencies
    .controller('FileController', ['$scope', '$http', '$timeout', '$state', function($scope, $http, $timeout, $state) {
        
        // Test call
        console.log('Im in the file controller');

        // Create new function called FileReader to get dropped files
        function fileReader(file) {
  
            // new FileReader api instance
            var reader = new FileReader();
            // When loaded, complete the following event
            reader.onload = function(event) {
                // log result
                console.log(reader.result);
                // if its successful post result to /api/files endpoint and log result // If error log the error
                $http.post('/api/files', {data: reader.result}).success(function (res) {
                    // $state.go('home');
                    console.log('File successful', res);
                    $scope.message = res.message;
                    console.log($scope.message);
                }).error(function(err){
                    console.log('err', err);
                }); 
            };
            // Read the file as a text string
            reader.readAsText(file);
        }

        // create a variable for when a file has been dropped called dropFile
        var dropFile = document.getElementById('drop_files');

        // When a file is dropped complete event // new array for the files to upload
        dropFile.addEventListener('drop', function(event){
            var fileToUpload = [];
            event.preventDefault();
            // create variable droppedFiles after a dataTansfer has been passed into the DOM
            var droppedFiles = event.dataTransfer;

            // check to see the type of fileLength exists because of the browser and append length.
            if(droppedFiles.items){
                for(var i =0; i< droppedFiles.items.length; i++){
                    fileReader(droppedFiles.items[i].getAsFile());
                    fileToUpload.push(droppedFiles.items[i]);
                    console.log(fileToUpload);
                    
                
                }
                
            } else {
                for(var i =0; i< droppedFiles.files.length; i++){
                    fileLength--;
                    fileReader(droppedFiles.files[i]);
                    fileToUpload.push(droppedFiles.files[i]);
                    // console.log('dropped file', droppedFiles.files[i]);
                    console.log(fileToUpload);
                    if(fileLength === 0){
                        $http.post('/api/files',  {data: fileToUpload}).success(function (res) {
                            console.log('res is', res);
                        }).error(function(err){
                            console.log('err', err)
                        }); 
                    }
                }
            }
        }, false);

        dropFile.addEventListener('dragenter', function(event){
            event.preventDefault();
            dropFile.style.border = "5px dotted black"

        }, false);

        dropFile.addEventListener('dragover', function(event){
            event.preventDefault();

        }, false);

        dropFile.addEventListener('dragend', function(event){

        }, false);


      
    }]);

