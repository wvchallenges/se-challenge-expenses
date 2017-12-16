package api

import (
	"net/http"

	"github.com/zsck/se-challenge-expenses/server/model"
)

// ExpenseReportUploader is an HTTP request handler that will:
//
// 1. Read a file being uploaded in received requests.
// 2. Attempt to parse the file as a CSV file containing information about employee expenses.
// 3. Store information about employees.
// 4. Store information about expenses.
// 5. Respond with the parsed data formatted as JSON.
type ExpenseReportUploader struct {
	employees model.EmployeeLedger
	expenses  model.ExpenseLedger
}

// NewExpenseReportUploader creates a new ExpenseReportUploader with capabilities for storing information
// about employees and expenses submitted by employees.
func NewExpenseReportUploader(employees model.EmployeeLedger, expenses model.ExpenseLedger) ExpenseReportUploader {
	return ExpenseReportUploader{
		employees,
		expenses,
	}
}

func (handler ExpenseReportUploader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("Hello world"))
}
