package model

const (
	qCreateEmployeeTable string = `
		create table if not exists (
			id integer primary key,
			name varchar(128) not null,
			address text not null
		);
	`
)

// Employee contains information about individuals employed by a company or organization.
type Employee struct {
	ID      Identifier `json:"id"`
	Name    string     `json:"name"`
	Address string     `json:"address"`
}

// EmployeeLedger is implemented by types capable of recording information about employees for future retrieval.
type EmployeeLedger interface {
	Record(Employee) error
}

// MockEmployeeLedger implements the EmployeeLedger interface in such a way that we can provide it with any
// function that effectively implements the interface, for the purpose of testing.
type MockEmployeeLedger struct {
	RecordFunc func(Employee) error
}

// Record calls the RecordFunc supplied to the mock.
func (mock MockEmployeeLedger) Record(employee Employee) error {
	return mock.RecordFunc(employee)
}
