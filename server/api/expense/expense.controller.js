'use strict'

const ExpenseService = require('./expense.service')
const ExpenseQueries = require('./expense.queries')

// Get montly expenses report
exports.report = function(req, res) {
    ExpenseQueries.expenseReportByMonth()
    .then(function(expenses) {
        res.status(201).json(expenses)
    }).catch(function(err){
        handleError(res, err)
    })
}

// Upload, process and store expense report from raw csv format
exports.create = function(req, res) {
    if (!req.files || !req.files.expenses) return res.status(400).end('Missing expenses file')
    var csvData = String(req.files.expenses.data)
    ExpenseService.saveExpenseCSV(csvData)
    .then(function(){
        res.redirect('/report.html')
    }).catch(function(err){
        return handleError(res, err)
    })
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send(err);
}