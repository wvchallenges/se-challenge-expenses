console.log("init");

var expenseFields = ["date", "category", "name", "address", "description", "pre_tax", "tax_name", "tax"];
var tableBody = document.getElementById("data-summary-body");

document.getElementById("csv-upload").addEventListener("change", readCSV);

function readCSV(event) {
  var data = null;
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function (event) {
    var parsedCSV = parseCSV(event.target.result);
    var mappedData = mapCSVData(parsedCSV);
    save(parsedCSV);
    var summary = calculateMonthlyExpenses(mappedData);
    display(summary);
  }
}

function parseCSV(data) {
  var splitCSVLineRegEx = /(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g

  var CSVData = data.split("\n").slice(1).map(function(line){
    return line.match(splitCSVLineRegEx).map(function(field){
      return field.replace(/"/g, '').trim();
    });
  });

  return CSVData;
}

function mapCSVData(data) {
  dataObject = data.map(function(line) {
    var lineHash = {};
    expenseFields.forEach(function(field, index){
      lineHash[field] = line[index];
      if (index == expenseFields.indexOf("tax") || index == expenseFields.indexOf("pre_tax")) {
        lineHash[field] = +parseFloat(lineHash[field].replace(/,/g, '')).toFixed(2);
      }
    });

    return lineHash;
  });

  return dataObject;
}

function calculateMonthlyExpenses(rows) {
  var summary = {}
  rows.forEach(function(row){
    date = new Date(row.date);
    expenseMonthAsNumber = date.getMonth() + 1
    expenseMonthAsWord = date.toLocaleString("en-br", { month: "long" });
    if (!summary.hasOwnProperty(expenseMonthAsNumber)) {
      summary[expenseMonthAsNumber] = [expenseMonthAsWord, (row.pre_tax + row.tax)];
    } else {
      summary[expenseMonthAsNumber][1] += (row.pre_tax + row.tax);
    }
  })

  return summary;
}

function display(monthlyExpenses) {
  tableBody.innerHTML = "";
  for (var i = 1; i <= 12; i++) {
    if (monthlyExpenses.hasOwnProperty(i)) {
      month_row = document.createElement("tr");
      name_column = document.createElement("td");
      value_column = document.createElement("td");
      name_column.innerText = monthlyExpenses[i][0];
      value_column.innerText = "$" + (+monthlyExpenses[i][1].toFixed(2));
      month_row.appendChild(name_column);
      month_row.appendChild(value_column);
      tableBody.appendChild(month_row);
    }
  }
}

function save(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', '/expenses');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}