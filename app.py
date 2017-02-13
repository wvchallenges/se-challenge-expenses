#!/usr/bin/python
import csv
import os.path
import cherrypy
import json
import datetime
from utils import util
from sqlobject.sqlbuilder import Select
from db.connection import conn
from db.models import ExpenseCategory, TaxType, Expense


class WebApp(object):	
	@cherrypy.expose
	def index(self):
		return open('index.html')


@cherrypy.expose
class WebService(object):
	
	def __init__(self):
		self._categories = {}
		self._taxTypes = {}
		
		# get existing categories from DB
		for category in ExpenseCategory.select():
			self._categories[category.name] = category

		# get existing tax types from DB
		for taxType in TaxType.select():
			self._taxTypes[taxType.name] = taxType

	def _addToDB(self, csvFile):
		CSV = util.enum(
				DATE=0, CATEGORY=1, EE_NAME=2, EE_ADDR=3,
		   		DESCR=4, PRETAX=5, TAX_TYPE=6, TAX=7)

		reader = csv.reader(csvFile)
		next(reader, None) # skip the headers
		for row in reader:
			categoryName = row[CSV.CATEGORY]
			if categoryName in self._categories:
				categoryObj = self._categories[categoryName]
			else:
				categoryObj = ExpenseCategory(name=categoryName)
				self._categories[categoryName] = categoryObj

			taxTypeName = row[CSV.TAX_TYPE]
			if taxTypeName in self._taxTypes:
				taxTypeObj = self._taxTypes[taxTypeName]
			else:
				taxTypeObj = TaxType(name=taxTypeName)
				self._taxTypes[taxTypeName] = taxTypeObj

			date = datetime.datetime.strptime(row[CSV.DATE], '%m/%d/%Y').date()
			employeeName = row[CSV.EE_NAME]
			employeeAddr = row[CSV.EE_ADDR]
			descr = row[CSV.DESCR]
			preTax = float(row[CSV.PRETAX].replace(',', ''))
			tax = float(row[CSV.TAX].replace(',', ''))
			expense = Expense(
						date=date, category=categoryObj, employeeName=employeeName,
						employeeAddr=employeeAddr, description=descr,
						preTaxAmt=preTax, taxType=taxTypeObj, taxAmt=tax)

	def _getSummary(self):
		results = {}

		COL = util.enum(YEAR=0, MONTH=1, PRETAX=2, TAX=3)
		select = Select(
				['YEAR(date)', 'MONTH(date)', 'SUM(pre_tax_amt)', 'SUM(tax_amt)'],
				staticTables=['expense'],
				groupBy='YEAR(date), MONTH(date)')
		query = conn.sqlrepr(select)
			# SELECT data, SUM(preTaxAmt), SUM(taxAmt) FROM expense GROUP BY MONTH(date)
		for row in conn.queryAll(query):
			dateStr = "%d/%d" % (row[COL.YEAR], row[COL.MONTH])
			totalAmt = str(row[COL.PRETAX] + row[COL.TAX])
			results[dateStr] = totalAmt

		return json.dumps(results)

	def POST(self, csvFile):
		self._addToDB(csvFile.file)	
		return self._getSummary()


if __name__ == '__main__':
	conf = {
		'/': {
			'tools.sessions.on': True,	
			'tools.staticdir.root': os.path.abspath(os.getcwd())
		},
		'/csvUpload': {
			'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
			'tools.response_headers.on': True,
		},
		'/static': {
			'tools.staticdir.on': True,
			'tools.staticdir.dir': './static',
		}
	}
	webapp = WebApp()
	webapp.csvUpload = WebService()
	cherrypy.quickstart(webapp, '/', conf)
