var ViewModel = function () {
    var self = this;
    self.selectedFiles = ko.observableArray();
    self.enableUpload = ko.observable(false);
    self.connectionId = '';
    self.fd = new FormData();
    self.onFileSelectedEvent = function (vm, evt) {
        ko.utils.arrayForEach(evt.target.files, function (file) {
            self.selectedFiles.push(file.name);
            if (IsValid(file.name)) {
                self.enableUpload(true);
                self.fd.append("file", file);
            } else {
                self.enableUpload(false);
            }
        });
    }

    self.showProgress = ko.observable(false);
    self.status = ko.observable();
    self.uploadResult = ko.observableArray([])

    self.upload = function () {
        //Ajax call to Insert the Employee record form csv file
        self.status('');
        self.uploadResult.removeAll();
        self.showProgress(false);
        jQuery.support.cors = true;
        $.ajax({
            crossDomain: true,
            url: GLOBAL.ServiceURL + "Upload/UploadFiles?connectionId=" + self.connectionId,
            type: "post",
            data: self.fd,
            processData: false,
            contentType: false,
            success: function () {
            },
            error: function (data) {
            },
            complete: function () {
                //self.status.removeAll();
                self.enableUpload(false);
            }
        })
    };

    var validFileExtension = [".csv"];
    function IsValid(fileName) {
        if (fileName.length > 0) {
            var isValid = false;
            for (var j = 0; j < validFileExtension.length; j++) {
                var curExtension = validFileExtension[j];
                if (fileName.substr(fileName.length - curExtension.length, curExtension.length).toLowerCase() == curExtension.toLowerCase()) {
                    isValid = true;
                    break;
                }
            }

            if (!isValid) {
                alert("Sorry, " + fileName + " is not allowed. Allowed extensions are: " + validFileExtension.join(", "));
                return false;
            }
        }

        return true;
    }



    self.updateuploadstatus = function (message) {
        if (message == 8) {
            self.showProgress(true);
            self.enableUpload(true);
        }
        self.status(Status[message]);
    }

    self.receiveUploadResult = function (data) {
        if (data != null && data != undefined) {
            //self.status.removeAll();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var item = {
                        Month: Months[data[i].Month],
                        TotalExpense: data[i].TotalExpense
                    }
                    self.uploadResult.push(item);
                }
            }
        }
    }
   
    self.percentComplete = ko.observable('0%');
    //self.total = 100;
    //self.i = 10;
    //self.showprogress = function () {
    //    self.percentComplete(self.i + '%');
    //    if (self.i < self.total) {
    //        self.i = self.i + 1;
    //        setTimeout(self.showprogress, 1);
    //    }
    //}

    self.updateMigrationProgress = function (data) {
        self.percentComplete(data + '%');
    }

    var Status = {
        1: 'Upload In Progress',
        2: 'Upload Successfull',
        3: 'Upload Failed',
        4: 'Validation In Progress',
        5: 'Validation Successfull',
        6: 'Validation Failed',
        7: 'Sent For Processing',
        8: 'Processing Started',
        9: 'Processing Completed',
        10: 'Processing Failed',
        11: 'Aborted'
    }

    var Months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    //setTimeout(self.showprogress, 2000);
};


$(function () {

    var vm = new ViewModel();
    var connection = $.hubConnection();
    var hub = connection.createHubProxy("notificationHub");
    connection.url = GLOBAL.ServiceURL + 'signalr';

    hub.on('updateuploadstatus', function (message) {
        vm.updateuploadstatus(message);
    });

    hub.on('receiveUploadResult', function (data) {
        vm.receiveUploadResult(data);
    })

    hub.on('updateMigrationProgress', function (data) {
        vm.updateMigrationProgress(data);
    })

    connection.start()
        .done(function () {
            console.log('Now connected, connection ID=' + connection.id);
            vm.connectionId = connection.id;
        })
    .fail(function () {
        console.log('Could not connect');
    });

    ko.applyBindings(vm);
});


