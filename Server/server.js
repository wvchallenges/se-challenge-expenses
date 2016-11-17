const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const multer  = require('multer')
const upload = multer({dest: 'uploads/'})

//Requiring built in node module to read files
const fs = require('fs')

//Sync and require database
const db = require('./db_config')

// App level middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static('Public'))

// console.log('db', db.models.files)

app.post('/api/uploadFile', upload.single('file'), (req,res) => {
	console.log('req.file', req.file)
	fs.readFile(req.file.path, (err, buffer) => {
		if(err) console.log('err', err)
    	console.log('buffer', buffer.toString().split('\n'))
  	})
	res.end()
})




const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server is listening on port ${port}`))
