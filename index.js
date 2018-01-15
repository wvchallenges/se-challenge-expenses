const express = require('express');
const multer = require('multer');
const csv=require('csvtojson');

var storage = multer.memoryStorage()
const upload = multer({
  dest: 'uploads/',
  storage: storage,
  inMemory: true
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