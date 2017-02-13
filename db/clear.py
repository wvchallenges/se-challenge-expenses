#!/usr/bin/python
from sqlobject.sqlbuilder import Delete
from connection import conn


def clearTables():
	clear('expense')
	clear('expense_category')
	clear('tax_type')


def clear(tableName):
	delete = Delete(tableName, None)
	query = conn.sqlrepr(delete)
		# DELETE FROM tableName;
	conn.query(query)


if __name__ == '__main__':
	clearTables()
