'use strict'

const ExpenseService = require('./expense.service')
const ExpenseQueries = require('./expense.queries')

exports.report = function(req, res) {
    ExpenseQueries.expenseReportByMonth(function(err, expenses){
        if (err) return handleError(res, err)
        res.status(201).json(expenses)
    })
}

exports.create = function(req, res) {
    if (!req.files || !req.files.expenses) return res.status(400).end('Missing expenses file')
    var csvData = String(req.files.expenses.data)
    ExpenseService.saveExpenseCSV(csvData, function(err){
        if (err) return handleError(res, err)
        res.redirect('/report.html')
    })
}

function handleError(res, err) {
    console.log(err)
    return res.status(500).send(err);
}