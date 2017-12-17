package model

// Identifier represents the unique ID of a row in our database.
type Identifier int

const qLastRowID string = "select last_insert_rowid();"
