const express = require('express');
const multer = require('multer'); // express middleware for retrieving form data

const parseCSVFile = require('./parseCSVFile');
const DataManager = require('./DataManager');
const BusinessLayer = require('./BusinessLayer');
const DataAccessLayer = require('./DataAccessLayer');

const dm = new DataManager();
const dal = new DataAccessLayer(dm);
const bl = new BusinessLayer(dal);
const app = express();
const upload = multer();

app.post('/upload', upload.array('csvfiles'), (req, res) => { 
  bl.uploadEmployeeExpenseFiles(req.files).then(() => {
    dal.getEmployeeExpenseRecords().then((data) => {
      console.log(data);
      res.send('ok');
    })
    .catch((err) => {
      console.log('failure: ' + err);
    })
  })
  .catch((err) => {
    console.log('failure: ' + err);
  });
}); 

dm.initialize()
  .then(() => {
      app.listen(3000, () => {
        console.log('Express is listening to http://localhost:3000'); 
      });
    }
  )
  .catch((err) => {
    console.log('failure: ' + err);
  });
