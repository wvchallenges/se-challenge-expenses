package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/mattn/go-sqlite3"

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

	fmt.Println("Listening on 127.0.0.1:9001")
	http.ListenAndServe(":9001", nil)
}
