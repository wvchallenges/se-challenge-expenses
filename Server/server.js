const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const multer  = require('multer')
const Promise = require('bluebird');
const parse = Promise.promisify(require('csv-parse'))
const readFile = Promise.promisify(require('fs').readFile)
const upload = multer({dest: 'uploads/'})

//DB Table
const Files = require('./db_config')

//File format utility
const formatFile = require('./util_server')


// App level middleware
app.use(morgan('dev'))
app.use(express.static('Public'))


app.post('/api/uploadFile', upload.single('file'), (req,res) => {
	
	readFile(req.file.path).then(output => {
		
		parse(output.toString()).then(parsedFile => {
			
			let formattedFile = formatFile(parsedFile)
			//Post formatted file entries to the DB
			Files.bulkCreate(formattedFile).then(file => {
				res.status(201).json(file)
			})
			.catch(err => res.status(404).send(err))

		})
		.catch(err => res.status(404).send(err))
	})
	.catch(err => res.status(404).send(err))			
})




const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server is listening on port ${port}`))
