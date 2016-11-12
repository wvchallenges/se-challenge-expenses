'use strict'

const express = require('express')
const controller = require('./expense.controller')
const router = express.Router()

router.get('/report', controller.report)
router.post('/upload/csv', controller.create)

module.exports = router