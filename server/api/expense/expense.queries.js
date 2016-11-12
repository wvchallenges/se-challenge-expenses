'use strict'

const db = require('../../db')

module.exports.expenseReportByMonth = function(cb) {
    db.any('select to_char(date,\'Mon\') as month, extract(year from date) as year, sum("pre_tax_amount") as expenses from expenses group by 1,2')
    .then(function (data) {
        cb(null, data)
        return null
    })
    .catch(cb)
}

module.exports.createExpense = function(expenseArray, cb) {
    db.none("insert into expenses(date,category_id,employee_id,expense_description,pre_tax_amount,tax_name,tax_amount) values($1, $2, $3, $4, $5, $6, $7)", expenseArray)
    .then(cb)
    .catch(cb)
}

module.exports.getEmployeeId = function(employeeName, employeeAddress, cb) {
    db.one("select id from employees where employee_name = $1 limit 1", [employeeName])
    .then(function(employee){
        cb(null, employee.id)
        return null
    })
    .catch(function(err){
        db.one("insert into employees(employee_name, employee_address) values($1, $2) returning id", [employeeName, employeeAddress])
        .then(function(employee){
            if (employee) {
                return cb(null, employee.id)
            }
            return null
        })
    })
}

module.exports.getCategoryIdByName = function(categoryName, cb) {
    db.one("select id from categories where category_name = $1 limit 1", [categoryName])
    .then(function(category){
        cb(null, category.id)
        return null
    })
    .catch(function(err){
        db.one("insert into categories(category_name) values($1) returning id", [categoryName])
        .then(function(category){
            if (category) {
                return cb(null, category.id)
            }
            return null
        })
    })
}