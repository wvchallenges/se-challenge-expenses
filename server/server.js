import express from 'express';
import multer from 'multer' // express middleware for retrieving form data

const app = express();
const upload = multer();

app.post('/upload', upload.array('csvfiles'), (req, res) => {
  console.log(req.files); 
  res.send('ok'); 
}); 

const server = app.listen(3000, () => {
    console.log('Express is listening to http://localhost:3000');
});