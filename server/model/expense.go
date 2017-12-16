package model

import (
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
			tax_amount double,
			foreign key (submitted_by) references employees (id)
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
	TaxAmount    float64    `json:"taxAmount"`
}
