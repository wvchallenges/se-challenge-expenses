Dropzone.options.myDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  maxFiles: 1,
  autoProcessQueue : false,
  dictMaxFilesExceeded: 'You can only upload one file at a time.',
  dictFileTooBig: 'The maximum filesize allowed is 2 MB.',
  dictInvalidFileType: 'Please only upload a single .csv file.',
  acceptedFiles: '.csv',
  addRemoveLinks: true,

  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }
    else { done(); }
  },

  init : function() {
    
    var submitButton = document.querySelector("#submit-all")
    myDropzone = this;

    submitButton.addEventListener("click", function() {

        if (myDropzone.files.length == 0) {
          toastr.error('Please upload a .csv file and try again.')
        }

        myDropzone.processQueue();
        // Tell Dropzone to process all queued files.
    });

    // You might want to show the submit button only when
    // files are dropped here:
    this.on("addedfile", function() {
        // Show submit button here and/or inform user to click it.
    });

}

};

toastr.options = {
  "positionClass": "toast-bottom-right"
};