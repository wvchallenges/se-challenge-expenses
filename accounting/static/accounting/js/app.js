// Options for the dropzone.

Dropzone.options.myDropzone = {
  paramName: "file",
  maxFilesize: 2,
  maxFiles: 1,
  autoProcessQueue : false, // Prevent dropzone from uploading automatically
  dictMaxFilesExceeded: 'You can only upload one file at a time.',
  dictFileTooBig: 'The maximum filesize allowed is 2 MB.',
  dictInvalidFileType: 'Please only upload a single .csv file.',
  acceptedFiles: '.csv',
  addRemoveLinks: true,

  // Do this when a file is successfully uploaded.
  success: function() {
    toastr.success('Success!' )
    location.reload();
  },

  // Initialize the dropzone and find out if the DOM contains the expenses table.
  init : function() {

    var submitButton = document.querySelector("#submit-all")
    myDropzone = this;

    var elementExists = document.getElementById("expense_table");

    // If expenses table is on the DOM, display info message to the user. 
    if(elementExists) {
      toastr.info('You\'re currently looking at all data that has been uploaded until now.')
    }

    // Upload only when the Upload button is clicked. 
    submitButton.addEventListener("click", function() {

      // Check if no files are attached. If yes, show error message.
        if (myDropzone.files.length == 0) {
          toastr.error('Please upload a .csv file and try again.')
        }

        else {
          myDropzone.processQueue();
        }
    });

    }

};

toastr.options = {
  "positionClass": "toast-bottom-right"
};