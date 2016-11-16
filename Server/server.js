const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

// App level middleware
app.use(bodyParser())
app.use(morgan('dev'))
app.use(express.static('Public'))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server is listening on port ${port}`))
