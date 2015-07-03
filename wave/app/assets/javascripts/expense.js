var importedExpenses;
var currentData;

function getMonthlyData(data){
  var list = {}, year, month, yearAndMonth, temp;
  for (var i = data.length - 1; i >= 0; i--) {
    yearAndMonth = data[i].date.slice(0, 7);
    year = parseInt(data[i].date.slice(0, 4));
    month = parseInt(data[i].date.slice(5, 7));
    if (list[yearAndMonth] === undefined){
      list[yearAndMonth] = {};
      list[yearAndMonth].month = month;
      list[yearAndMonth].year = year;
      list[yearAndMonth].total = 0;
    }
    temp = parseFloat(data[i].amount) + parseFloat(data[i].tax_amount);
    list[yearAndMonth].total = Math.round((list[yearAndMonth].total + temp) * 100) / 100;
  };
  currentData = list;
}

function showData(){
  //custom function to convert float to $monays
  function convertTotal(money){
    input = money.toString();
    var test = input.split("");
    if (input.match(/\./) !== null) {
      var part2;
      for (var i = 0; i < test.length; i++) {
        if (test[i] == ".") {
          part2 = test.slice(i, i+3);
          test = test.slice(0, i);
          break;
        }
      };
    }
    if (test.length > 3) {
      for (var i = test.length - 3; i > 0; i = i - 3) {
        test.splice(i, 0, ",");
      };
    }
    if (part2) {
      test = test.concat(part2);
    }
    input = test.join("");
    return '$' + input;
  }

  function convertDate(month){
    switch (month){
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September'
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
      default: return 'Date Error';
    }
  }

  var htmlString = '';
  for (var property in currentData){
    htmlString = '<div class="monthly-row"><div class="monthly-date">';
    htmlString += '' + currentData[property].year + ' - ' + convertDate(currentData[property].month);
    htmlString += '</div><div class="monthly-total">';
    htmlString += convertTotal(currentData[property].total) + '</div></div>';
    $('#monthly_append').append(htmlString);
  }
}

$( document ).ready(function(){
  console.log('ready!');
  $('#csv').on('change', function(){
    if ($('#csv').val()){
      $('#select_button').addClass('active');
      $('#select_button').html($('#csv').val());
    }
  });
  $('#close_table').on('click', function(){
    $('#monthly_table').css('display', 'none');
  });
  $('#open_table').on('click', function(){
    if (importedExpenses !== undefined && importedExpenses.length > 0){
      $('#monthly_table').css('display', 'block');
    }
  });
});

$.ajax({
  type: "GET",
  url: "/expenses/get_expenses"
}).done(function(data) {
  if (data !== undefined && data.length > 0){
    $('#monthly_table').css('display', 'block');
    importedExpenses = data;
    getMonthlyData(importedExpenses);
    showData();
  } else {
    $('#monthly_table').css('display', 'none');
  }
})
