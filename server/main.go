package main

import (
	"database/sql"
	"net/http"

	"github.com/zsck/se-challenge-expenses/server/api"
	"github.com/zsck/se-challenge-expenses/server/model"
)

const databaseFile string = "database.db"

func main() {
	db, err := sql.Open("sqlite3", databaseFile)
	if err != nil {
		panic(err)
	}
	err = model.SetupTables(db)
	if err != nil {
		panic(err)
	}

	employees := model.NewEmployeeLedgerDB(db)
	expenses := model.NewExpenseLedgerDB(db)
	uploadHandler := api.NewExpenseReportUploader(employees, expenses)

	http.Handle("/report", uploadHandler)
	http.ListenAndServe(":9001", nil)
}
