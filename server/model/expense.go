package model

import (
	"database/sql"
	"time"
)

const (
	qCreateExpenseTable string = `
		create table if not exists expense_reports (
			id integer primary key,
			submitted_by integer,
			date timestamp not null,
			category varchar(64) not null,
			description text,
			pre_tax_amount double,
			tax_name varchar(32) not null,
			tax_amount double,
			foreign key (submitted_by) references employees (id)
		);
		`

	qInsertExpense string = `
		insert into expense_reports (
			submitted_by, date, category, description, pre_tax_amount, tax_name, tax_amount
		) values (
			?, ?, ?, ?, ?, ?, ?
		);
	`
)

// Expense contains information about a single expense submitted by an employee.
type Expense struct {
	ID           Identifier `json:"id"`
	SubmittedBy  Identifier `json:"submittedBy"`
	Date         time.Time  `json:"date"`
	Category     string     `json:"category"`
	Description  string     `json:"description"`
	PreTaxAmount float64    `json:"preTaxAmount"`
	TaxName      string     `json:"taxName"`
	TaxAmount    float64    `json:"taxAmount"`
}

// ExpenseLedger is implemented by types capable of recording information about submitted expenses.
type ExpenseLedger interface {
	Record(*Expense) error
}

// ExpenseLedgerDB implements ExpenseLedger and stores records in a SQLite database.
type ExpenseLedgerDB struct {
	db *sql.DB
}

// NewExpenseLedgerDB constructs a new ExpenseLedgerDB.
func NewExpenseLedgerDB(db *sql.DB) ExpenseLedgerDB {
	return ExpenseLedgerDB{
		db,
	}
}

// Record saves an expense to the ledger's database and updates the expense's ID.
func (ledger ExpenseLedgerDB) Record(expense *Expense) error {
	_, err := ledger.db.Exec(
		qInsertExpense,
		expense.SubmittedBy,
		expense.Date,
		expense.Category,
		expense.Description,
		expense.PreTaxAmount,
		expense.TaxName,
		expense.TaxAmount,
	)
	if err != nil {
		return err
	}

	var id int
	err = ledger.db.QueryRow(qLastRowID).Scan(&id)
	if err != nil {
		return err
	}
	expense.ID = Identifier(id)
	return nil
}

// MockExpenseLedger provides a simple way to create a mock implementation of ExpenseLedger using
// any function that helps to test desired behavior.
type MockExpenseLedger struct {
	RecordFunc func(*Expense) error
}

// Record calls on the mocked Record function provided to the MockExpenseLedger.
func (mock MockExpenseLedger) Record(expense *Expense) error {
	return mock.RecordFunc(expense)
}
