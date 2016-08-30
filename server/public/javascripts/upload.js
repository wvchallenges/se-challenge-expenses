// Wrap in IIFE to avoid global pollute
(function() {
  // Handle progress bar during file upload
  var progressHandler = function() {
    // create an XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // listen to the 'progress' event
    xhr.upload.addEventListener('progress', function(e) {
      if (e.lengthComputable) {
        // calculate the percentage of upload completed
        var percentComplete = e.loaded / e.total;
        percentComplete = parseInt(percentComplete * 100);

        // Update progress
        var $progressBarEl = $('.progress-bar');
        $progressBarEl.text(percentComplete + '%');
        $progressBarEl.width(percentComplete + '%');

        // once the upload reaches 100%, set the progress bar text to done
        if (percentComplete === 100) {
          $progressBarEl.html('Done');
        }
      }
    }, false);
    return xhr;
  };


  // Handle success callback
  // Draw table
  // Draw chart by google chart api
  var uploadSuccessHandler = function(data) {
    var chartRows = [];

    // Draw table
    var table = '<table><tr><th class="title">Month</th><th class="title">Total expense</th></tr>>';
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var expense = +(+data[key]).toFixed(2);
        chartRows.push([key, expense]);
        table += '<tr><th class="content">' + key + '</th><th class="content">' + expense + '</th></tr>'
      }
    }
    table += '</table>';
    $('.data-table').append(table);

    // Draw chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Expense');
      data.addRows(chartRows);

      // Set chart options
      var options = {
        title: 'Total expenses per month',
        width: 400,
        height: 300
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    });
  };


  $('.upload-btn').on('click', function (){
    $('#upload-input').click();
    var $progressBarEl = $('.progress-bar');
    $progressBarEl.text('0%');
    $progressBarEl.width('0%');
  });


  $('#upload-input').on('change', function(){
    var files = $(this).get(0).files;
    if (files.length > 0){
      var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // add the files to formData object for the data payload
        formData.append('upload', file, file.name);
      }

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          if (!res || res['error'] == '1' || !res['data']) {
            // TODO: handle response error
            return;
          }

          uploadSuccessHandler(res['data']);
        },
        xhr: progressHandler
      });
    }
  });
})();
