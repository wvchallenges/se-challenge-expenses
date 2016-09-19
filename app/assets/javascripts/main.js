function showResults(data) {
  for(var month in data) {
    $('#report tbody').append('<tr><td>'+month+'</td><td>'+data[month]+'</td></tr>');
  }
  $('#report').show();
}

$(document).ready(function() {
  $("#upload").click(function () {
    var formData = new FormData($('form')[0]);
    $.ajax({
      url: '/', 
      type: 'POST',
      success: function(data) {
        showResults(data);
      },
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
    return false;
  });
});

