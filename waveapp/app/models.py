from app import db
from datetime import date

class Expenses(db.Model):
	__tablename__ = 'expenses'
	eid = db.Column(db.Integer, primary_key=True)
	date = db.Column(db.Date)
	category = db.Column(db.String(100))
	employee_name = db.Column(db.String(100))
	employee_address = db.Column(db.String(100))
	expense_description = db.Column(db.String(200))
	pre_tax_amount = db.Column(db.Float)
	tax_name = db.Column(db.String(100))
	tax_amount = db.Column(db.Float)

	def __repr__(self):
		return self.employee_name

	def __init__(self, date, category, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount):
		self.date = date
		self.category = category
		self.employee_name = employee_name
		self.employee_address = employee_address
		self.expense_description = expense_description
		self.pre_tax_amount = pre_tax_amount
		self.tax_name = tax_name
		self.tax_amount = tax_amount