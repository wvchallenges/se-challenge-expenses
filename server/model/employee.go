package model

import "database/sql"

const (
	qCreateEmployeeTable string = `
		create table if not exists employees (
			id integer primary key,
			name varchar(128) not null,
			address text not null
		);
	`

	qInsertEmployee string = `
		insert into employees (
			name, address
		) values (
			?, ?
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
	Record(*Employee) error
}

// EmployeeLedgerDB implements EmployeeLedger and stores records in a SQLite database.
type EmployeeLedgerDB struct {
	db *sql.DB
}

// NewEmployeeLedgerDB constructs an EmployeeLedgerDB.
func NewEmployeeLedgerDB(db *sql.DB) EmployeeLedgerDB {
	return EmployeeLedgerDB{
		db,
	}
}

// Record saves an employee to the ledger's database and updates the employee's ID.
func (ledger EmployeeLedgerDB) Record(employee *Employee) error {
	_, err := ledger.db.Exec(
		qInsertEmployee,
		employee.Name,
		employee.Address,
	)
	if err != nil {
		return err
	}

	var id int
	err = ledger.db.QueryRow(qLastRowID).Scan(&id)
	if err != nil {
		return err
	}
	employee.ID = Identifier(id)
	return nil
}

// MockEmployeeLedger implements the EmployeeLedger interface in such a way that we can provide it with any
// function that effectively implements the interface, for the purpose of testing.
type MockEmployeeLedger struct {
	RecordFunc func(*Employee) error
}

// Record calls the RecordFunc supplied to the mock.
func (mock MockEmployeeLedger) Record(employee *Employee) error {
	return mock.RecordFunc(employee)
}
