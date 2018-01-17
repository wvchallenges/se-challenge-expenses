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

var thing = function(result) {
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
            1,
            "a",
            "b",
            "c",
            "d",
            1.0,
            "e",
            2.0
        )`;

    var getIt =
        `SELECT
            date,
            category,
            employee_name,
            employee_address,
            expense_description,
            pre_tax_amount,
            tax_name,
            tax_amount
        FROM
            expenses`;
    
    /*db.run(stuff, [], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Table created');
    });*/

    db.serialize(() => {
        // Queries scheduled here will be serialized.
        db.run(stuff,[], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log('Table created');
        })
        .run(other, [], function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        })
        .all(getIt, [], function(err, rows) {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row.tax_amount);
              });
        })
    });

    // close the database connection
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
thing();
const app = express();

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
        thing(result);
        res.send(result);
    }); 
    /*, function(err,result) {
        if(err)return res.send("ERR")
        res.send(result);
    }); */

/*.on('csv', (row)=> {
        console.log(row);
    })
    .on('done', (err,result)=> {
        if(err)return res.send("ERR")
        console.log(result);
        
        res.send(result);
    }); 
*/

});

app.listen(3000);