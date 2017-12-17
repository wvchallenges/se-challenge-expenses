package api

import (
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
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
// 5. Write back a list of the expenses parsed from the CSV.
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
	Error    *string         `json:"error"`
	Expenses []model.Expense `json:"expense"`
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
	errMissingReportField := "request must contain a `report` field whose value is a CSV file"
	errUnableToOpenFile := "server unable to open uploaded file"
	errFailedToParseCSV := "failed to parse the contents of the submitted CSV file"

	res.Header().Set("Content-Type", "application/json")
	toClient := json.NewEncoder(res)

	if err := req.ParseMultipartForm(handler.MaxFileSize); err != nil {
		res.WriteHeader(http.StatusBadRequest)
		errMsg := err.Error()
		fmt.Println("ERROR 1:", err)
		toClient.Encode(uploadExpenseReportResponse{
			Error:    &errMsg,
			Expenses: []model.Expense{},
		})
		return
	}

	files, found := req.MultipartForm.File[formKey]
	if !found || len(files) == 0 {
		fmt.Println("ERROR 2")
		res.WriteHeader(http.StatusBadRequest)
		toClient.Encode(uploadExpenseReportResponse{
			Error:    &errMissingReportField,
			Expenses: []model.Expense{},
		})
		return
	}
	uploadedFile, openErr := files[0].Open()
	if openErr != nil {
		fmt.Println("ERROR 3:", openErr)
		res.WriteHeader(http.StatusInternalServerError)
		toClient.Encode(uploadExpenseReportResponse{
			Error:    &errUnableToOpenFile,
			Expenses: []model.Expense{},
		})
		return
	}

	parser := csv.NewReader(uploadedFile)
	allRecords, parseErr := parser.ReadAll()
	if parseErr != nil {
		fmt.Println("ERROR 4:", parseErr)
		res.WriteHeader(http.StatusBadRequest)
		toClient.Encode(uploadExpenseReportResponse{
			Error:    &errFailedToParseCSV,
			Expenses: []model.Expense{},
		})
		return
	}

	employees, expenses, errors := extractEntities(allRecords)
	for _, employee := range employees {
		if err := handler.employees.Record(employee); err != nil {
			errors = append(errors, err)
		}
	}
	for _, expense := range expenses {
		if err := handler.expenses.Record(expense); err != nil {
			errors = append(errors, err)
		}
	}

	errMsg := "Encountered the following errors:\n"
	for _, err := range errors {
		errMsg += err.Error() + "\n"
	}
	if len(errMsg) > len("Encountered the following errors:\n") {
		fmt.Println("ERROR 4:", errMsg)
		res.WriteHeader(http.StatusInternalServerError)
		toClient.Encode(uploadExpenseReportResponse{
			Error:    &errMsg,
			Expenses: []model.Expense{},
		})
	} else {
		toClient.Encode(uploadExpenseReportResponse{
			Error:    nil,
			Expenses: expenses,
		})
	}
}

// extractEntities sifts thorugh the plain string records parsed from an uploaded CSV file and returns any employee
// and expense data it is able to extract from each record in an array.
func extractEntities(csvRecords [][]string) ([]model.Employee, []model.Expense, []error) {
	employees := make([]model.Employee, 0)
	expenses := make([]model.Expense, 0)
	errors := make([]error, 0)
	fmt.Println("Calling extractEntities with records\n", csvRecords)
	for _, record := range csvRecords[1:] {
		fmt.Println("Parsing record", record)
		employee, err := extractEmployee(record)
		if err != nil {
			errors = append(errors, err)
		} else {
			employees = append(employees, employee)
		}

		expense, err := extractExpense(record)
		if err != nil {
			errors = append(errors, err)
		} else {
			expenses = append(expenses, expense)
		}
	}
	return employees, expenses, errors
}

func extractEmployee(record []string) (model.Employee, error) {
	if len(record) < len(csvFileHeaders) {
		err := errors.New("not enough columns in record")
		fmt.Println("Returning err", err, err != nil)
		return model.Employee{}, err
	}
	employee := model.Employee{
		ID:      0,
		Name:    record[2],
		Address: record[3],
	}
	return employee, nil
}

func extractExpense(record []string) (model.Expense, error) {
	// Parse the date.
	dateParts := strings.Split(record[0], "/")
	if len(dateParts) != 3 {
		return model.Expense{}, errors.New("invalid date format")
	}
	month, err1 := strconv.Atoi(strings.TrimSpace(dateParts[0]))
	day, err2 := strconv.Atoi(strings.TrimSpace(dateParts[1]))
	year, err3 := strconv.Atoi(strings.TrimSpace(dateParts[2]))
	if err1 != nil || err2 != nil || err3 != nil {
		fmt.Println(err1, err2, err3)
		return model.Expense{}, errors.New("invalid date format")
	}

	// Parse the pre- and tax amounts.
	if len(record) < len(csvFileHeaders) {
		return model.Expense{}, errors.New("not enough columns in record")
	}
	preTaxStr := strings.TrimSpace(strings.Replace(record[5], ",", "", -1))
	preTaxAmount, parseErr := strconv.ParseFloat(preTaxStr, 64)
	if parseErr != nil {
		return model.Expense{}, parseErr
	}
	taxStr := strings.TrimSpace(strings.Replace(record[7], ",", "", -1))
	taxAmount, parseErr := strconv.ParseFloat(taxStr, 64)
	if parseErr != nil {
		return model.Expense{}, parseErr
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
