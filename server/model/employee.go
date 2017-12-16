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
