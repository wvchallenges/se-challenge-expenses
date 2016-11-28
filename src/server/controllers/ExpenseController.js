const path = require('path');
const pg = require('pg');

const connectURL = 'postgres://localhost:5432/expenses';
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  saveExpense: (req, res) => {
    // get uploaded file's filename
    const file = path.resolve(`${__dirname}/../../../uploads/${req.file.filename}`);

    // hold rows of records
    const results = [];
    // parse csv file
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        pg.connect(connectURL, (err, client, done) => {
          if (err) {
            return res.status(500).json({ message: 'Error connecting to database', err });
          }
          // truncate temp table for most recent upload
          client.query('TRUNCATE TABLE temp RESTART IDENTITY');
          // query to save data into database
          const saveQueryPerm = 'INSERT INTO records(date, category, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount) values($1, $2, $3, $4, $5, $6, $7, $8)';
          const saveQueryTemp = 'INSERT INTO temp(date, category, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount) values($1, $2, $3, $4, $5, $6, $7, $8);';
          for (let i = 0; i < results.length; i += 1) {
            const correlatedSaveQuery = [results[i].date, results[i].category, results[i]['employee name'], results[i]['employee address'], results[i]['expense description'], results[i]['pre-tax amount'].trim(), results[i]['tax name'], results[i]['tax amount'].trim()];
            // save to records table permanent
            client.query(saveQueryPerm, correlatedSaveQuery);

            // save to temp table temporaily
            client.query(saveQueryTemp, correlatedSaveQuery);
          }
          // return data of most recent upload
          return client.query("SELECT to_char(date,'YYYY-MM') as yy_mm, SUM(pre_tax_amount + tax_amount) FROM temp GROUP BY yy_mm ORDER BY yy_mm DESC;", (err2, result) => {
            if (err2) {
              done();
              return res.status(500).send({ message: 'Error retrieve records', err2 });
            }
            done();
            return res.status(200).send(result.rows);
          });
        });
      })
      .on('end', () => process.stdout.write('query complete'));
  },
};
