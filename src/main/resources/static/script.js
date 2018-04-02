const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const onUploadCompleted = (event) => {
  const title = document.getElementById('title');
  title.innerText = 'Monthly Expense Report';
  const csvform = document.getElementById('csvform');
  csvform.hidden = true;

  renderTable(JSON.parse(event.target.response));
}

const renderTable = (tableData) => {
  const hotElement = document.getElementById('table');
  const hotElementContainer = hotElement.parentNode;
  const monthRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    td.innerHTML = monthNames[value-1];
    return td;
  }
  const hotSettings = {
    colHeaders: true,
    data: tableData,
    colHeaders: ["Month", "Year", "Monthly Pre-tax Total", "Monthly Tax Total", "Monthly Total"],
    columns: [
      {
        data: 'month',
        type: 'text',
        renderer: monthRenderer,
        readOnly: true
      },
      {
        data: 'year',
        type: 'numeric',
        readOnly: true
      },
      {
        data: 'sumPreTaxAmount',
        type: 'numeric',
        numericFormat: {
          pattern: '$0,0.00'
        },
        readOnly: true
      },
      {
        data: 'sumTaxAmount',
        type: 'numeric',
        numericFormat: {
          pattern: '$0,0.00'
        },
        readOnly: true
      },
      {
        data: 'sumTotal',
        type: 'numeric',
        numericFormat: {
          pattern: '$0,0.00'
        },
        readOnly: true
      }
    ], 
  };
  const hot = new Handsontable(hotElement, hotSettings);
}

window.onload = () => {
  const form = document.getElementById('csvform');
  const fileInput = document.getElementById('fileinput');
  const submitButton = document.getElementById('submitbutton');

  fileInput.onchange = (event) => {
    if (fileInput.value) {
      submitButton.hidden = false;
    } else {
      submitButton.hidden = true;
    }
  }

  form.onsubmit = (event) => {
    event.preventDefault();

    submitButton.value = 'Uploading...';

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('csvfile', file, file.name);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'csv', true);
    xhr.onload = onUploadCompleted;
    xhr.send(formData);
  };
};
