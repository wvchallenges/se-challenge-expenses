'use strict'

const db = require('../../db')

// All of our queries for handling expenses
//   We could relocate the employee and category quries to their own api module,
//   but since there are no other operations, they can stay here for now.
module.exports = {
    expenseReportByMonth: function() {
        return db.any('select to_char(date,\'Mon\') as month, extract(year from date) as year, sum("pre_tax_amount") as expenses, min(date) as mdate from expenses group by 1,2 order by mdate desc')
    },
    createExpense: function(expenseArray) {
        return db.none("insert into expenses(date,category_id,employee_id,expense_description,pre_tax_amount,tax_name,tax_amount) values($1, $2, $3, $4, $5, $6, $7)", expenseArray)
    },
    getEmployeeId: function(employeeName, employeeAddress) {
        return db.one("select id from employees where employee_name = $1 limit 1", [employeeName])
    },
    createEmployee: function(employeeName, employeeAddress) {
        return db.one("insert into employees(employee_name, employee_address) values($1, $2) returning id", [employeeName, employeeAddress])
    },
    getCategoryIdByName: function(categoryName) {
        return db.one("select id from categories where category_name = $1 limit 1", [categoryName])
    },
    createCategory: function(categoryName) {
        return db.one("insert into categories(category_name) values($1) returning id", [categoryName])
    }
}