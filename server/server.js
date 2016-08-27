const express = require('express');
const multer = require('multer'); // express middleware for retrieving form data

const parseCSVFile = require('./parseCSVFile');
const DataManager = require('./DataManager');

const dm = new DataManager();
const app = express();
const upload = multer();

app.post('/upload', upload.array('csvfiles'), (req, res) => { 
  var data = req.files.reduce((prev, curr) => {
    return prev.concat(parseCSVFile(curr.buffer));
  }, []);

  dm.insertRows('EmployeeExpense', data)
    .then(() => {
      console.log('success');
    })
    .catch((err) => {
      console.log('failure: ' + err);
    });

  res.send('ok'); 
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
