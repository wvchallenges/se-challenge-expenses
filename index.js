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

// open database in memory
var db = new sqlite3.Database('sample.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
   
db.run('CREATE TABLE expenses(name text)', [], function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log('Table created');
});

// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
});

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', upload.single('upload-file'), (req, res) => {
    var csvString = req.file.buffer.toString()
    csv().fromString(csvString, function(err,result){
        if(err)return res.send("ERR")
        res.send(result);
    }); 


});

app.listen(3000);