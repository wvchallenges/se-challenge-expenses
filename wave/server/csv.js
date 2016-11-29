const fs = require('fs');
const parse = require('csv-parse');
const { CSV_DB_MAP } = require('./constants');

function parseCSV(file, onEnd) {
  fs.exists(file.path, exists => {
    if (!exists) {
      return false;
    }
  });
  const source = fs.createReadStream(file.path);
  const parser = parse({
    delimiter: ',', 
    columns: true,
  });
  const output = [];
  parser.on('readable', () => {
    let record;
    while (record = parser.read()) {
      output.push(record);
    }
  });
  parser.on('end', () => {
    onEnd(output);
  });
  source.pipe(parser);
  return true;
}

function rowBuilder(row) {
  const mapResult = {};
  for (key in row) {
    const mappedKey = CSV_DB_MAP[key];
    switch (mappedKey) {
      case 'date':
        const newDate = row[key].split('/');
        mapResult[mappedKey] = `${newDate[2]}-${newDate[0]}-${newDate[1]}`;
        break;
      
      case 'tax':
      case 'pretax':
        mapResult[mappedKey] = parseFloat(row[key].replace(/,/g, ''));
        break;

      default:
        mapResult[mappedKey] = row[key];
    }
  }
  return mapResult;
}

module.exports = { parseCSV, rowBuilder };
