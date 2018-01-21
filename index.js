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

// Array method that sorts rows based on date while simultaneuously merging elements with common months into one element
Array.prototype.sortAndMerge = function() {
    do {
        var didSwap = false;
        for (let i = 0; i < this.length-1; ++i) {
            if (this[i].date.getMonth() === this[i+1].date.getMonth() && this[i].date.getYear() === this[i+1].date.getYear()) {
                this[i].pre_tax_amount += this[i+1].pre_tax_amount;
                this.splice(i + 1, 1);
            } else if (this[i].date > this[i+1].date) {
                let temp = this[i];
                this[i] = this[i + 1];
                this[i + 1] = temp;
                didSwap = true;
            }
        }
    } while (didSwap === true);

    return this;
}

let outputData = (dataRows, res) => {
    // Format data into JS Date Objects and Floats
    let output = dataRows.map((row) => {
        return {
            date: new Date(row.date),
            pre_tax_amount: parseFloat(row.pre_tax_amount.toString().replace(/,/g, ''))
        };
    })
    .sortAndMerge()
    // Format outout into readable format
    .map((entry) => {
        return {
            date: month[entry.date.getMonth()] + ' ' + entry.date.getFullYear(),
            pre_tax_amount: "$" + entry.pre_tax_amount
        };
    });

    // Render output
    res.render('output', { data: output });
}

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
    
        // Query the data back from the database, retreiving only the same number of rows as most recent upload/insert
        db.all(selectQuery + csvData.length, [], (error, dataRows) => {
            if (error) {
                return console.log(error.message);
            }
            // Process data and render output
            outputData(dataRows, res);
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