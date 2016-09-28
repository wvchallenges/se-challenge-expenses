import os
import csv
from datetime import datetime
from itertools import groupby

from flask import Flask, request, redirect, render_template, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from sqlalchemy import func, extract, desc

UPLOAD_FOLDER = '/tmp'
ALLOWED_EXTENSIONS = set(['csv'])
MAX_STR_LEN = 256
DATE_FORMAT = '%m/%d/%Y'

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

class Expense(db.Model):
    '''
        Expense model
    '''
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime)
    category = db.Column(db.String(MAX_STR_LEN))
    employee_name = db.Column(db.String(MAX_STR_LEN))
    employee_address = db.Column(db.String(MAX_STR_LEN))
    expense_description = db.Column(db.Text)
    pretax_amount = db.Column(db.Float)
    tax_name = db.Column(db.String(MAX_STR_LEN))
    tax_amount = db.Column(db.Float)

    def __init__(self,
                date,
                category,
                employee_name,
                employee_address,
                expense_description,
                pretax_amount,
                tax_name,
                tax_amount):
        self.date = date
        self.category = category
        self.employee_name = employee_name
        self.expense_description = expense_description
        self.pretax_amount = pretax_amount
        self.tax_name = tax_name
        self.tax_amount = tax_amount

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
            expense = Expense(
                datetime.strptime(line[DATE], DATE_FORMAT),
                line[CATEGORY],
                line[EMPLOYEE_NAME],
                line[EMPLOYEE_ADDRESS],
                line[EXPENSE_DESCRIPTION],
                line[PRETAX_AMOUNT].replace(',', ''),
                line[TAX_NAME],
                line[TAX_AMOUNT].replace(',', '')
            )
            expenses.append(expense)
            db.session.add(expense)
        db.session.commit()
        return expenses
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        raise e

def query_monthly_expenses():
    '''
        Query monthly expenses from database.

        Return a list of (month, year, pretax_amount, tax_amount) tuples sorted
        chronologically.
    '''
    expenses = db.session.query(
        extract('month', Expense.date).label('month'),
        extract('year', Expense.date).label('year'),
        func.sum(Expense.pretax_amount).label('pretax_amount'),
        func.sum(Expense.tax_amount).label('tax_amount'),
    ).group_by(
        extract('month', Expense.date),
        extract('year', Expense.date)
    ).order_by(desc('year')).order_by(desc('month')).all()

    return expenses

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
    return monthly_expenses.itervalues()

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    '''
        POST - process file upload
        GET - display monthly expenses and file upload form.
    '''
    filename = ''
    monthly_expenses = []
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
        except Exception as e:
            abort(500)
        monthly_expenses = calculate_monthly_expenses(expenses)
        filename = f.filename

    return render_template('main.html',
                           expenses=monthly_expenses,
                           filename=filename)
