const express = require('express');
const multer = require('multer');
const csv=require('csvtojson');
const sqlite3 = require('sqlite3');

var storage = multer.memoryStorage()
const upload = multer({
  dest: 'uploads/',
  storage: storage,
  inMemory: true
}); 

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var thing = function(result, res) {
    // open database in memory
    var db = new sqlite3.Database('expenses.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });

    var stuff =
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

    var other =
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

    var getIt =
        `SELECT
            date,
            pre_tax_amount
        FROM
            expenses
        ORDER BY
            expense_id DESC
        LIMIT
            ${result.length}`;

    // Queries scheduled here will be serialized.
    db.run(stuff,[], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Table created');
    });

    result.forEach((row) => {
        db.run(other, row, function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

    });
    
var output = [];
    db.all(getIt, [], function(err, rows) {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            row.date = new Date(row.date);
            row.pre_tax_amount = parseFloat(row.pre_tax_amount.toString().replace(/,/g, ''));
            output.push(row);
        });
        output.sort(function(a, b) {
            return a.date - b.date;
        });

        var out = [];
out.push(output.shift());
var thing = 0;
output.forEach(function(row, index) {
    if (row.date.getMonth() === out[thing].date.getMonth() && row.date.getYear() === out[thing].date.getYear()) {
        out[thing].pre_tax_amount += row.pre_tax_amount;
    } else {
        out[thing].date = month[out[thing].date.getMonth()] + ' ' + out[thing].date.getFullYear();
        thing++;
        out.push(row);
    }
})
out[thing].date = month[out[thing].date.getMonth()] + ' ' + out[thing].date.getFullYear();

res.render('output', {data: out});
        
    });



    // close the database connection
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

const app = express();
app.engine('pug', require('pug').__express);
//app.set('views', '/Users/johwood/Sites/se-challenge-expenses/views');
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', upload.single('upload-file'), (req, res) => {
    var csvString = req.file.buffer.toString();
    var result = [];
    csv({noheader:false}).fromString(csvString)
    .on('csv', (row)=> {
        result.push(row);
    })
    .on('done', (err)=> {
        if (err) return res.send("ERR");
        thing(result, res);

    }); 
});

app.listen(3000);