const express = require('express');
const multer = require('multer'); // express middleware for retrieving form data

const parseCSVFile = require('./parseCSVFile');

const app = express();
const upload = multer();

app.post('/upload', upload.array('csvfiles'), (req, res) => { 
  var data = req.files.reduce((prev, curr) => {
    return prev.concat(parseCSVFile(curr.buffer));
  }, []);

  console.log(data);

  res.send('ok'); 
}); 

const server = app.listen(3000, () => {
    console.log('Express is listening to http://localhost:3000');
});