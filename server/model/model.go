package model

import "database/sql"

// Identifier represents the unique ID of a row in our database.
type Identifier int

const qLastRowID string = "select last_insert_rowid();"

// SetupTables creates the tables for the database.
func SetupTables(db *sql.DB) error {
	_, err := db.Exec(qCreateEmployeeTable)
	if err != nil {
		return err
	}
	_, err = db.Exec(qCreateExpenseTable)
	if err != nil {
		return err
	}
	return nil
}
