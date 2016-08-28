const express = require('express');
const multer = require('multer'); // express middleware for retrieving form data

const DataManager = require('./DataManager');
const BusinessLayer = require('./BusinessLayer');
const DataAccessLayer = require('./DataAccessLayer');

const dm = new DataManager();
const dal = new DataAccessLayer(dm);
const bl = new BusinessLayer(dal);
const app = express();
const upload = multer();

// allow Cross origin since client is hosted on different port than server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/upload', upload.array('csvfiles'), (req, res) => { 
  bl.uploadEmployeeExpenseFiles(req.files)
    .then(res.send('ok'))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to upload files, see server logs for more info');
    })
});

app.get('/expensesPerMonth', (req, res) => {
  bl.getTotalExpensesPerMonth()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.status('500').send('Failed to retrieve results, see server logs for more info');
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
