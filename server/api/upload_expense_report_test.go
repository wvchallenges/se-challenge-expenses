package api

import (
	"bytes"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/zsck/se-challenge-expenses/server/model"
)

const (
	// This is the example CSV file given in the challenge.
	exampleCSVFile string = `
		date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
		12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 
		12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63 
		12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93 
		12/14/2013,Computer - Software,Tim Cook,"1 Infinite Loop, Cupertino, CA 95014",Microsoft Office, 899.00 ,CA Sales tax, 67.43 
		12/6/2013,Computer - Software,Sergey Brin,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iCloud Subscription, 50.00 ,CA Sales tax, 3.75 
		12/9/2013,Computer - Software,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iCloud Subscription, 50.00 ,CA Sales tax, 3.75 
		11/10/2013,Meals and Entertainment,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Coffee with Steve, 300.00 ,CA Sales tax, 22.50 
		11/12/2013,Travel,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Taxi ride, 230.00 ,CA Sales tax, 17.25 
		11/20/2013,Meals and Entertainment,Don Draper,"783 Park Ave, New York, NY 10021",Client dinner, 200.00 ,NY Sales tax, 15.00 
		10/4/2013,Travel,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Flight to Miami, 200.00 ,CA Sales tax, 15.00 
		10/12/2013,Computer - Hardware,Don Draper,"783 Park Ave, New York, NY 10021",Macbook Air," 1,999.00 ",NY Sales tax, 177.41 
		12/9/2013,Computer - Software,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Dropbox Subscription, 15.00 ,CA Sales tax, 1.13 
		9/18/2013,Travel,Tim Cook,"1 Infinite Loop, Cupertino, CA 95014",Taxi ride, 200.00 ,CA Sales tax, 15.00 
		9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00 
		12/30/2013,Meals and Entertainment,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Dinner with potential acquisition, 200.00 ,CA Sales tax, 15.00 
		1/6/2014,Computer - Hardware,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",iPhone, 200.00 ,CA Sales tax, 15.00 
		1/7/2014,Travel,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Airplane ticket to NY, 200.00 ,CA Sales tax, 15.00 
		2/3/2014,Meals and Entertainment,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",Starbucks coffee, 12.00 ,CA Sales tax, 0.90 
		2/18/2014,Travel,Eric Schmidt,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Airplane ticket to NY," 1,500.00 ",CA Sales tax, 112.50 
	`

	// This is an invalid copy of the first two lines of the example CSV file. The date has been removed.
	invalidCSVFile string = `
		date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
		Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 
	`
)

func uploadCSVFile(endpoint *url.URL, csvFileContents []byte) (*http.Response, error) {
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)
	fileWriter, err := writer.CreateFormFile("report", "report.csv")
	if err != nil {
		return nil, err
	}
	_, err = fileWriter.Write(csvFileContents)
	if err != nil {
		return nil, err
	}
	writer.Close()
	request, err := http.NewRequest("POST", endpoint.String(), &buffer)
	if err != nil {
		return nil, err
	}
	request.Header.Set("Content-Type", writer.FormDataContentType())
	client := &http.Client{}
	return client.Do(request)
}

func TestExpenseReportUploaderCSVHandling(test *testing.T) {
	employeeLedger := model.MockEmployeeLedger{
		RecordFunc: func(employee model.Employee) error {
			return nil
		},
	}
	expenseLedger := model.MockExpenseLedger{
		RecordFunc: func(expense model.Expense) error {
			return nil
		},
	}
	uploadHandler := NewExpenseReportUploader(employeeLedger, expenseLedger)

	server := httptest.NewServer(uploadHandler)
	serverURL, _ := url.Parse(server.URL)
	defer server.Close()

	// Each test case defined below will be run to test different pieces of behavior expected of the
	// ExpenseReportUploader. Specifically, we're testing that the request handler:
	//
	// 1. Parses the CSV file and returns an error if there is data missing or the formatting is incorrect.
	// 2. Ensures that all of the data that we expect to be provided is present.
	testCases := []struct {
		CSVString   string
		ShouldError bool
	}{
		{
			CSVString:   exampleCSVFile,
			ShouldError: false,
		},
		{
			CSVString:   invalidCSVFile,
			ShouldError: true,
		},
	}

	for caseNum, testCase := range testCases {
		test.Logf("Running test case #%d", caseNum)
		response, err := uploadCSVFile(serverURL, []byte(testCase.CSVString))
		gotError := err != nil
		if gotError != testCase.ShouldError {
			test.Fatalf("Expected upload to produce an error? %v. Got error: %v", testCase.ShouldError, err)
		}
		if response.StatusCode != http.StatusOK {
			test.Errorf("Expected status code %d. Got %d", http.StatusOK, response.StatusCode)
		}
		responseData := uploadExpenseReportResponse{}
		decodeError := json.NewDecoder(response.Body).Decode(&responseData)
		if decodeError != nil {
			test.Fatalf("Failed to decode the server's response. Error: %s", decodeError.Error())
		}
		gotError = responseData.Error != nil
		if gotError != testCase.ShouldError {
			if gotError {
				test.Fatalf(
					"Expected to get an error in response? %v. Got error: %s",
					testCase.ShouldError,
					*responseData.Error,
				)
			} else {
				test.Fatalf("Expected to get an error in response? %v. Got error: nil", testCase.ShouldError)
			}
		}
	}
}
