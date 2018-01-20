const express = require('express');
const multer = require('multer');
const csv=require('csvtojson');
const sqlite3 = require('sqlite3');

const storage = multer.memoryStorage()
const upload = multer({
  inMemory: true
}); 

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const createQuery =
    `CREATE TABLE expenses (
        expense_id integer PRIMARY KEY,
        date integer NOT NULL,
        category text NOT NULL,
        employee_name text NOT NULL,
        employee_address text NOT NULL,
        expense_description text NOT NULL,
        pre_tax_amount float NOT NULL,
        tax_name text NOT NULL,
        tax_amount float NOT NULL
    )`;
const insertQuery =
    `INSERT INTO expenses (
        date,
        category,
        employee_name,
        employee_address,
        expense_description,
        pre_tax_amount,
        tax_name,
        tax_amount
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
    )`;
const selectQuery =
    `SELECT
        date,
        pre_tax_amount
    FROM
        expenses
    ORDER BY
        expense_id DESC
    LIMIT
        `;

const app = express();
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

let processData = (csvData, res) => {

    // Connect to or create database
    let db = new sqlite3.Database('expenses.db', (error) => {
        if (error) {
            return console.error(error.message);
        }
    });

    // Serialize database actions so they run in order
    db.serialize(() => {
        
        // Create table it if does not exist yet
        db.run(createQuery, [], (error) => {
            if (error) {
                return console.error(error.message);
            }
        });

        // Insert the data from the csv file into the database
        csvData.forEach((row) => {
            db.run(insertQuery, row, (error) => {
                if (error) {
                    return console.log(error.message);
                }
            });
        });
    
        // Query the data back from the database, retreiving only the same number of rows as what inserted
        db.all(selectQuery + csvData.length, [], (error, dataRows) => {
            if (error) {
                return console.log(error.message);
            }

            // Format data into JS Date Objects and Floats
            let formattedData = [];
            dataRows.forEach((row) => {
                row.date = new Date(row.date);
                row.pre_tax_amount = parseFloat(row.pre_tax_amount.toString().replace(/,/g, ''));
                formattedData.push(row);
            });
            
            //Sort data
            formattedData.sort((a, b) => {
                return a.date - b.date;
            });

            // Create output array and push in first entry of formatted data
            let outputData = [];
            let outputIndex = 0;
            outputData.push(formattedData.shift());
            
            // Iterate through remaining rows:
            //   - if month is the same then add expense amount into output data
            //   - if not then create a new entry in output data
            formattedData.forEach((row) => {
                if (row.date.getMonth() === outputData[outputIndex].date.getMonth() && row.date.getYear() === outputData[outputIndex].date.getYear()) {
                    outputData[outputIndex].pre_tax_amount += row.pre_tax_amount;
                } else {
                    outputIndex++;
                    outputData.push(row);
                }
            });

            // Format output to be reader friendly
            outputData = outputData.map((entry) => {
                return {
                    date: month[entry.date.getMonth()] + ' ' + entry.date.getFullYear(),
                    pre_tax_amount: "$" + entry.pre_tax_amount
                };
            });

            // Render output
            res.render('output', {data: outputData});
                    
        });
    });

    // Close the database connection
    db.close((error) => {
        if (error) {
            return console.error(error.message);
        }
    });
}

// Render file upload form on initial page load
app.get('/', (req, res) => {
  res.render('index');
});

// Receive the uploaded file and parse csv data into an array
app.post('/', upload.single('upload-file'), (req, res) => {
    if (req.file) {
        let csvString = req.file.buffer.toString();
        let csvData = [];
        csv({noheader:false}).fromString(csvString)
        .on('csv', (row)=> {
            csvData.push(row);
        })
        .on('done', (err)=> {
            if (err) return res.send("ERR");
            processData(csvData, res);
        });
    }
});

app.listen(3000);