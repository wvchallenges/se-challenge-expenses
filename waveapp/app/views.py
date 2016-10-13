from app import app, db
from flask import jsonify, render_template, request, redirect, url_for
from models import Expenses
import os, sys, csv, datetime, re, calendar
from collections import OrderedDict

@app.route('/')
@app.route('/index')
def index():
	#Retrieve all expenses from the database
	expenses = Expenses.query.all()
	if expenses:
		monthlyTotal = [0] * 12
		for e in expenses:
			monthlyTotal[e.date.month-1] += (e.pre_tax_amount + e.tax_amount)
		#Create dictionary of months and monthly totals
		expenseDict = OrderedDict()
		for i in range(12):
			expenseDict[calendar.month_name[i+1]] = format_currency(monthlyTotal[i])
		return render_template('index.html', expenseDict = expenseDict)
	else:
		return render_template('index.html')


#Upload saves the CSV file to /tmp folder within application
@app.route('/upload', methods = ['POST'])
def upload():
	if request.method == 'POST':
		file = request.files['file']
		if file:
			file.save(os.path.join('./tmp/', 'upload.csv'))
		else:
 			return render_template('index.html', upload='false')
	return redirect(url_for('process'))


#Process parses and writes data from CSV file to the database
@app.route('/process')
def process():
	#Parse CSV data, create an Expense object for each record
	with open('tmp/upload.csv') as csvfile:
		reader = csv.DictReader(csvfile)
		for row in reader:
			exp = Expenses(
				datetime.datetime.strptime(row['date'], '%m/%d/%Y').date(), 
				row['category'],
				row['employee name'],
				row['employee address'],
				row['expense description'],
				float(row['pre-tax amount'].replace(',','')),
				row['tax name'],
				float(row['tax amount'].replace(',','')))
			db.session.add(exp)
		db.session.commit()
	return redirect('/')

#Use regex to display monthly total in an appropriate currency format
def format_currency(value):
	return "${:,.2f}".format(value)