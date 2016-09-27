import os
import csv
from datetime import datetime
from itertools import groupby

from flask import Flask, request, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from sqlalchemy import func

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
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///testing.db'

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

def month_year_grouper(item):
    '''
        Return the (month, year) tuple for the given item.
    '''
    return item.date.month, item.date.year

def read_file_to_db(csv_file):
    '''
        Read the file into database.
    '''
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
        db.session.add(expense)
    db.session.commit()


def query_monthly_expense():
    '''
        Query monthly expenses from database.

        Return a list of ("mm/yyyy", pretax_amount, tax_amount) tuples sorted
        chronologically.
    '''
    expenses = db.session.query(
        Expense.date,
        Expense.pretax_amount,
        Expense.tax_amount,
    ).order_by(Expense.date).all()

    monthly_expenses = []
    for (month, year), items in groupby(expenses, month_year_grouper):
        pretax_amount = 0
        tax_amount = 0
        for i in items:
            pretax_amount += i.pretax_amount
            tax_amount += i.tax_amount
        monthly_expenses.append(((month, year), pretax_amount, tax_amount))

    return monthly_expenses

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    '''
        POST - process file upload
        GET - display monthly expenses and file upload form.
    '''
    if request.method == 'POST':
        # check if post has a file part
        if 'file' not in request.files:
            return redirect(request.url)

        f = request.files['file']

        # check empty file name
        if f and f.filename == '':
            return redirect(request.url)

        read_file_to_db(f)

    expenses = query_monthly_expense()

    return render_template('main.html')
