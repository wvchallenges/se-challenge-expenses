package api

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/zsck/se-challenge-expenses/server/model"
)

const defaultFileSize int64 = 1024 * 1024 // 1MB

// The name of the key in the request form that should contain the uploaded CSV file.
const formKey string = "report"

var csvFileHeaders = []string{
	"date",
	"category",
	"employee name",
	"employee address",
	"expense description",
	"pre-tax amount",
	"tax name",
	"tax amount",
}

// ExpenseReportUploader is an HTTP request handler that will:
//
// 1. Read a file being uploaded in received requests.
// 2. Attempt to parse the file as a CSV file containing information about employee expenses.
// 3. Store information about employees.
// 4. Store information about expenses.
type ExpenseReportUploader struct {
	employees model.EmployeeLedger
	expenses  model.ExpenseLedger

	// MaxFileSize is the maximum number of bytes of memory to store uploaded files in.
	// As per the Golang documentation, files exceeding this size will be partially stored on disk.
	MaxFileSize int64
}

// uploadExpenseReportResponse is a simple container for the response produced by the ExpenseReportUploader,
// which will be encoded to JSON.
type uploadExpenseReportResponse struct {
	Error *string `json:"error"`
}

// NewExpenseReportUploader creates a new ExpenseReportUploader with capabilities for storing information
// about employees and expenses submitted by employees.
func NewExpenseReportUploader(employees model.EmployeeLedger, expenses model.ExpenseLedger) ExpenseReportUploader {
	return ExpenseReportUploader{
		employees,
		expenses,
		defaultFileSize,
	}
}

// ServeHTTP handles file uploads containing CSV files with employee and expense data in them.
//
// CSV files are expected to have the following headers:
// date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
func (handler ExpenseReportUploader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
}

// extractEntities sifts thorugh the plain string records parsed from an uploaded CSV file and writes any employee
// and expense data it is able to extract from each record through the provided channels.
func extractEntities(
	csvRecords [][]string,
	employees chan<- model.Employee,
	expenses chan<- model.Expense,
	errs chan<- error,
) {
	for _, record := range csvRecords {
		employee, err := extractEmployee(record)
		if err != nil {
			errs <- err
		} else {
			employees <- employee
		}

		expense, err := extractExpense(record)
		if err != nil {
			errs <- err
		} else {
			expenses <- expense
		}
	}
	close(employees)
	close(expenses)
	close(errs)
}

func extractEmployee(record []string) (model.Employee, error) {
	if len(record) < len(csvFileHeaders) {
		return model.Employee{}, errors.New("not enough columns in record")
	}
	employee := model.Employee{
		ID:      0,
		Name:    record[2],
		Address: record[3],
	}
	return employee, nil
}

func extractExpense(record []string) (model.Expense, error) {
	// Parse the pre- and tax amounts.
	if len(record) < len(csvFileHeaders) {
		return model.Expense{}, errors.New("not enough columns in record")
	}
	preTaxAmount, parseErr := strconv.ParseFloat(record[5], 64)
	if parseErr != nil {
		return model.Expense{}, parseErr
	}
	taxAmount, parseErr := strconv.ParseFloat(record[7], 64)
	if parseErr != nil {
		return model.Expense{}, parseErr
	}

	// Parse the date.
	dateParts := strings.Split(record[0], "/")
	if len(dateParts) != 3 {
		return model.Expense{}, errors.New("invalid date format")
	}
	month, err1 := strconv.Atoi(dateParts[0])
	day, err2 := strconv.Atoi(dateParts[1])
	year, err3 := strconv.Atoi(dateParts[2])
	if err1 != nil || err2 != nil || err3 != nil {
		return model.Expense{}, errors.New("invalid date format")
	}

	utc, _ := time.LoadLocation("UTC")
	expense := model.Expense{
		ID:           0,
		SubmittedBy:  0,
		Date:         time.Date(year, time.Month(month), day, 0, 0, 0, 0, utc),
		Category:     record[1],
		Description:  record[4],
		PreTaxAmount: preTaxAmount,
		TaxName:      record[6],
		TaxAmount:    taxAmount,
	}
	return expense, nil
}
