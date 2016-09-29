import os
import csv
from datetime import datetime
from itertools import groupby

from flask import Flask, request, redirect, render_template, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from werkzeug.contrib.cache import SimpleCache
from sqlalchemy import func, extract, desc

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['csv'])
MAX_STR_LEN = 256
DATE_FORMAT = '%m/%d/%Y'

# Notable cache keys
LAST_FILENAME = 'last_filename'
LAST_MONTHLY = 'last_monthly'

# CSV field names
DATE = 'date'
CATEGORY = 'category'
EMPLOYEE_NAME = 'employee name'
EMPLOYEE_ADDRESS = 'employee address'
EXPENSE_DESCRIPTION = 'expense description'
PRETAX_AMOUNT = 'pre-tax amount'
TAX_NAME = 'tax name'
TAX_AMOUNT = 'tax amount'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://<username>:<password>@localhost/<database>'

db = SQLAlchemy(app)
last_cache = SimpleCache(default_timeout=0)
upload_cache = SimpleCache(default_timeout=0)

class Expense(db.Model):
    '''
        Expense model
    '''
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    category = db.Column(db.String(MAX_STR_LEN), nullable=False)
    employee = db.Column(db.Integer,
                         db.ForeignKey('employee.id'),
                         nullable=False)
    description = db.Column(db.Text, nullable=False)
    pretax_amount = db.Column(db.Float, nullable=False)
    tax_name = db.Column(db.String(MAX_STR_LEN), nullable=False)
    tax_amount = db.Column(db.Float, nullable=False)

class Employee(db.Model):
    '''
        Employee model
    '''
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(MAX_STR_LEN), nullable=False)
    address = db.Column(db.String(MAX_STR_LEN), nullable=False)

def allowed_filename(filename):
    '''
        Check that the given filename is allowed.

        Return True if the filename is allowed. Otherwise, return False.
    '''
    return filename.split('.')[-1] in ALLOWED_EXTENSIONS

def read_file_to_db(csv_file):
    '''
        Read the file into database.

        Return a list of Expenses read from the file and commited to the
        database.
    '''
    try:
        expenses = []
        reader = csv.DictReader(csv_file)
        for line in reader:

            employee = Employee.query.filter_by(
                name=line[EMPLOYEE_NAME],
                address=line[EMPLOYEE_ADDRESS]
            ).first()

            if not employee:
                employee = Employee(
                    name=line[EMPLOYEE_NAME],
                    address=line[EMPLOYEE_ADDRESS]
                )
                db.session.add(employee)
                db.session.commit()

            expense = Expense(
                date=datetime.strptime(line[DATE], DATE_FORMAT),
                category=line[CATEGORY],
                employee=employee.id,
                description=line[EXPENSE_DESCRIPTION],
                pretax_amount=line[PRETAX_AMOUNT].replace(',',''),
                tax_name=line[TAX_NAME],
                tax_amount=line[TAX_AMOUNT].replace(',','')
            )

            db.session.add(expense)
            expenses.append(expense)

        db.session.commit()
        return expenses
    except Expense as e:
        db.session.rollback()
        raise e

def calculate_monthly_expenses(expenses):
    '''
        Compute monthly expenses from the given list of expenses.

        Return a list of (month, year, pretax_amount, tax_amount) tuples sorted
        chronologically.
    '''
    monthly_expenses = {}
    for e in expenses:
        month_year = datetime(e.date.year, e.date.month, 1)
        pretax = 0
        tax = 0
        if month_year in monthly_expenses:
            _, _, pretax, tax = monthly_expenses[month_year]
        monthly_expenses[month_year] = (e.date.month,
                                        e.date.year,
                                        pretax + e.pretax_amount,
                                        tax + e.tax_amount)
    return monthly_expenses.values()

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    '''
        POST - process file upload
        GET - display monthly expenses and file upload form.
    '''
    filename, monthly_expenses = last_cache.get_many(
        LAST_FILENAME,
        LAST_MONTHLY
    )
    if request.method == 'POST':
        # check if post has a file part
        if 'file' not in request.files:
            return redirect(request.url)

        f = request.files['file']

        # check empty file name
        if f and f.filename == '':
            return redirect(request.url)

        try:
            expenses = read_file_to_db(f)
            monthly_expenses = calculate_monthly_expenses(expenses)
            filename = f.filename
            last_cache.set_many({
                LAST_FILENAME: filename,
                LAST_MONTHLY: monthly_expenses
            })
        except Exception as e:
            return redirect(request.url)

    return render_template('main.html',
                           expenses=monthly_expenses,
                           filename=filename)
