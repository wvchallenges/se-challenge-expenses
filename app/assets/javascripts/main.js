// TODO: modularize functions
function format_date(date_string) {
  var s = date_string.split('-'),
      date = new Date(parseInt(s[0]), parseInt(s[1])-1, 1);
  var result = date.toLocaleString('en-us', { month: 'long', year: 'numeric' });
  return result;
}

// from: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function show_results(data) {
  for(var month in data) {
    $('#report tbody').append('<tr><td>'+format_date(month)+'</td><td>'+parseFloat(data[month]).formatMoney(2, '.', ',')+'</td></tr>');
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
        show_results(data);
      },
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
    return false;
  });
});

