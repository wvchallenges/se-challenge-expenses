Dropzone.options.myDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  maxFiles: 1,
  dictMaxFilesExceeded: 'You can only upload one file at a time.',
  dictFileTooBig: 'The maximum filesize allowed is 2 MB.',
  dictInvalidFileType: 'Please only upload a .csv file.',
  acceptedFiles: '.csv',
  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }
    else { done(); }
  }
};