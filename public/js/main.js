// Group 1: file upload functions

// Enable the dropzone
function initDragAndDrop() {
  // Drag and drop upload, code from https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications#Handling_the_upload_process_for_a_file

  window.onload = function() {
    var dropzone = document.getElementById("dropzone");
    dropzone.ondragover = dropzone.ondragenter = function(event) {
      event.stopPropagation();
      event.preventDefault();
      dropzone.classList.add('mdl-shadow--16dp');
    }

    dropzone.ondrop = function(event) {
      event.stopPropagation();
      event.preventDefault();
      dropzone.classList.remove('mdl-shadow--16dp');
      var filesArray = event.dataTransfer.files;
      for (var i = 0; i < filesArray.length; i++) {
        readFile(filesArray[i]);
      }
    }
  }
}

// Enable the file upload input
function handleFile() {
  oFiles = document.getElementById("uploadInput").files;
  for (var i in oFiles) {
    if (typeof oFiles[i] == 'object') {
      readFile(oFiles[i]);
    }
  }
}

// Group 2: data processing functions

// parse the uploaded file
function readFile(file) {
  var reader = new FileReader();
  reader.onload = function() {
    // parse CSV to rows
    var rows = CSV.parse(this.result);
    // send parsed data rows to the table filling function at front end
    fillDataToTable(rows, true);
    // send parsed data rows to the save to DB function at back end
    saveBatch(rows);
    // logging
    var summaryPrompt = document.getElementById("summaryPrompt");
    if (summaryPrompt) summaryPrompt.outerHTML = "";
  }
  // Initial the sequence
  reader.readAsText(file);
}

// process data rows and fill in table
function fillDataToTable(dataRows, hasHeader) {
  // This function furfills this requirement: after upload, your application should display a table of the total expenses amount per-month represented by the uploaded file.

  // Step 1: Remove the headerRow if there is one
  if (hasHeader && dataRows.length) {
    dataRows.shift();
  }

  // Step 2: Aggregate data by month
  var aggregatedDataDict = {},
    totalRowsCount = 0,
    validRowsCount = 0;
  for (var i in dataRows) {
    try {
      // When load from archive, the incoming dataRows are objects and need to be converted to array
      if (!(dataRows[i] instanceof Array)) {
        dataRows[i] = Object.keys(dataRows[i]).map(function(key) {
          return dataRows[i][key];
        });
      }
      // Check if date field is a valid date, also check if pre-tax and tax are valid numbers
      if (moment(dataRows[i][0], "M/D/YYYY").isValid() && isNumeric(dataRows[i][5]) && isNumeric(dataRows[i][7])) {
        validRowsCount++;

        // format the month
        var month = moment(dataRows[i][0], "M/D/YYYY").format("MMM, YYYY");

        // add the pre-tax amount and the tax amount
        var totalRowExpense = parseFloat(dataRows[i][5].replace(/,/g, '')) + parseFloat(dataRows[i][7].replace(/,/g, ''));

        // do the sum
        if (month in aggregatedDataDict) {
          aggregatedDataDict[month] += totalRowExpense;
        } else {
          aggregatedDataDict[month] = totalRowExpense;
        }
      }
    } catch (e) {
      alert(e);
    } finally {
      totalRowsCount++;
    }
  }
  // map the aggregatedData dict object into Array, so later can be sorted and loaded into HTML table
  var aggregatedDataArray = Object.keys(aggregatedDataDict).map(function(key) {
    // First column: month, second column: total expenses
    return [key, aggregatedDataDict[key].toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2
    })]
  });
  // sort the aggregatedDataArray
  aggregatedDataArray.sort(function(a, b) {
    return moment(a, "MMM, YYYY").diff(moment(b, "MMM, YYYY"));
  });
  // append the log
  document.getElementById("summaryLog").innerHTML = "Total in file: " + totalRowsCount + " rows; Imported:  " + validRowsCount + " rows. "

  // Step 3: fill the HTML table
  var seTable = document.getElementById("seTable")
    // show the table
  seTable.style.visibility = "visible";
  // clear table rows
  var seTableBody = document.getElementById("seTableBody");
  while (seTableBody.firstChild) {
    seTableBody.removeChild(seTableBody.firstChild);
  }
  // genarate table rows
  for (i = 0; i < aggregatedDataArray.length; i++) {
    var tr = document.createElement('TR');
    for (j = 0; j < aggregatedDataArray[i].length; j++) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(aggregatedDataArray[i][j]));
      tr.appendChild(td);
    };
    seTableBody.appendChild(tr);
  }
};

// Group 3: API calls

// call saveBatch to send data rows to back end and store them
function saveBatch(rows) {
  // show the progress circle
  document.getElementById("summarySpinner").style.visibility = "visible";
  var uri = "/api/saveBatch";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", uri, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // logging
      document.getElementById("summaryLog").innerHTML += "<br/>Saved in database with batch No.: " + JSON.parse(xhr.responseText).batchNo;
      // hide the progress circle
      document.getElementById("summarySpinner").style.visibility = "hidden";
      // refresh archive list table
      getBatchList();
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(rows));
}

// call getBatchList to get top 5 archived batches
function getBatchList() {
  var url = "/api/getBatchList";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Handle response.
      var archives = JSON.parse(xhr.responseText).results;
      // find the archive list table
      var seArchiveTableBody = document.getElementById("seArchiveTableBody");
      // clear the archive list table
      while (seArchiveTableBody.firstChild) {
        seArchiveTableBody.removeChild(seArchiveTableBody.firstChild);
      }
      // genarate table rows
      for (i = 0; i < archives.length; i++) {
        var tr = document.createElement('TR');
        for (var j in archives[i]) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(archives[i][j].toString().substring(0, 10)));
          tr.appendChild(td);
        }
        tr.addEventListener("click", function() {
          getBatch(this.lastChild.innerHTML)
        }, false);
        seArchiveTableBody.appendChild(tr);
      }
    }
  };
  xhr.send(null);
}

// call getBatch to get one batch
function getBatch(batchNo) {
  var url = "/api/getBatch";
  var params = "batchNo=" + batchNo;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url + "?" + params, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Handle response.
      var dataRows = JSON.parse(xhr.responseText).results;
      // send data rows to table filling function with hasHeader=false
      fillDataToTable(dataRows, false);
      // logging
      var summaryPrompt = document.getElementById("summaryPrompt");
      if (summaryPrompt) summaryPrompt.outerHTML = "";
    }
  };
  xhr.send(null);
}

// Utility function(s)

// tells whether a data string is numeric
function isNumeric(n) {
  n = n.replace(/,/g, ''); // remove comma, for financial formats
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// init when page loads
initDragAndDrop();
getBatchList();
