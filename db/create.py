#!/usr/bin/python
from models import ExpenseCategory, TaxType, Expense


def createTables():
	for table in (ExpenseCategory, TaxType, Expense):
		table.createTable(ifNotExists=True)


if __name__ == '__main__':
	createTables()
