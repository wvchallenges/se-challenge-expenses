#!/usr/bin/python
import sqlobject
from connection import conn


class TaxType(sqlobject.SQLObject):
	_connection = conn
	name = sqlobject.StringCol()


class ExpenseCategory(sqlobject.SQLObject):
	_connection = conn
	name = sqlobject.StringCol()


class Expense(sqlobject.SQLObject):
	_connection = conn
	date = sqlobject.DateCol()
	category = sqlobject.ForeignKey('ExpenseCategory')
	employeeName = sqlobject.StringCol()
	employeeAddr = sqlobject.StringCol()
	description = sqlobject.StringCol()
	preTaxAmt = sqlobject.CurrencyCol()
	taxType = sqlobject.ForeignKey('TaxType')
	taxAmt = sqlobject.CurrencyCol()
