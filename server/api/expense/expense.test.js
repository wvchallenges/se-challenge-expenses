'use strict'

const fs = require('fs')
const db = require('../../db')
const Promise = require("bluebird")
const ExpenseService = require('./expense.service')
const ExpenseQueries = require('./expense.queries')

const expectedEmployees = 7
const expectedCategories = 5
const expectedExpenses = 19
const expectedReportRows = 6

module.exports.start = function() {
    return new Promise(function (resolve, reject) {
        clearDatabase()
        .then(function(){
            console.log('Passed: Clear Database')
            return testImport(expectedEmployees, expectedCategories, expectedExpenses)
        })
        .then(function(){
            console.log('Passed: First Import')
            return testImport(expectedEmployees, expectedCategories, expectedExpenses*2)
        })
        .then(function(){
            console.log('Passed: Subsequent Import')
            return testReport(expectedReportRows)
        })
        .then(function(){
            console.log('Passed: Report')
            resolve()
        })
        .then(function(){
            return clearDatabase()
        })
        .catch(reject)
    })
}

function clearDatabase() {
    return db.none('DELETE FROM EXPENSES; DELETE FROM EMPLOYEES; DELETE FROM CATEGORIES;')
}

function testImport(expectedEmployeeCount, expectedCategorieCount, expectedExpenseCount) {
    return new Promise(function (resolve, reject) {
        fs.readFile('data_example.csv', 'utf8', function (err, data) {
            if (err) return reject(err)

            ExpenseService.saveExpenseCSV(data)
            .then(function(){
                return db.one('SELECT count(*) from employees')
            })
            .then(function(res){
                if (res.count != expectedEmployeeCount){
                    return reject(`employee count ${res.count} but expected ${expectedEmployeeCount}`)
                }
                return db.one('SELECT count(*) from categories')
            })
            .then(function(res){
                if (res.count != expectedCategorieCount){
                    return reject(`category count ${res.count} but expected ${expectedCategorieCount}`)
                }
                return db.one('SELECT count(*) from expenses')
            })
            .then(function(res){
                if (res.count != expectedExpenseCount){
                    return reject(`expense count ${res.count} but expected ${expectedExpenseCount}`)
                }
                return resolve()
            })
            .catch(function(err){
                reject(err)
            })
        })
    })
}

function testReport(expectedRowCount) {
    return new Promise(function (resolve, reject) {
        ExpenseQueries.expenseReportByMonth()
        .then(function(report){
            if (report.length != expectedRowCount){
                return reject(`report row count ${report.length} but expected ${expectedRowCount}`)
            }
            return resolve()
        }).catch(function(err){
            reject(err)
        })
    })
}
