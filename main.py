import csv
import os
import pygal
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, ForeignKey
from sqlalchemy import Integer, String, func, DateTime
from werkzeug.utils import secure_filename
from database_setup import Expense
from pygal.style import CleanStyle
from flask import Flask, render_template, request, redirect
from flask import url_for, flash, send_from_directory


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['csv'])


engine = create_engine('postgresql://vagrant:kexin@localhost/company')
app = Flask(__name__)
Base = declarative_base()
Base.metadata.create_all(engine)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# maximum allowed payload 16 megabytes
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/',  methods=['GET', 'POST'])
@app.route('/uploads/', methods=['GET', 'POST'])
def mainPage():
    if (request.method == 'POST'):
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            company = Company(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash("File " + filename + " uploaded")
            importToDB(filename)
            return redirect(url_for('fileMainPage', filename=filename))

    return render_template('index.html')


@app.route('/uploads/<filename>', methods=['GET'])
def fileMainPage(filename):
    return render_template('fileMain.html', filename=filename)


@app.route('/uploads/report', methods=['GET'])
def monthlyExpenseReport():
    monthlyExpenses = generateMonthlyExpense()
    return render_template('monthlyExpense.html',
                           monthlyExpenses=monthlyExpenses)


@app.route('/graph')
def graph():
    chart = pygal.Bar(style=CleanStyle)
    monthLabel = []
    expenseList = []
    for data in company.monthlyExpenses:
        monthLabel.append(data.month)
        expenseList.append(data.total)
    chart.x_labels = map(str, monthLabel)
    chart.add('Expense($)', expenseList)
    return chart.render_response()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


def importToDB(filename):
    emptyExpenseTable()
    f = open(app.config['UPLOAD_FOLDER']+"/"+filename, 'r')
    reader = csv.reader(f)
    i = 0
    for row in reader:
        # skip header row
        if (i != 0):
            addExpense(row)
        else:
            i += 1


def emptyExpenseTable():
    session.query(Expense).delete()
    session.commit()


def addExpense(row):
    newItem = Expense(
        date=row[0], category=row[1], employee=row[2],
        address=row[3], description=row[4], pre_tax=row[5].replace(',', ''),
        tax_name=row[6], tax_amount=row[7].replace(',', ''))
    session.add(newItem)
    session.commit()


def generateMonthlyExpense():
    result = session.query(
        func.sum(Expense.pre_tax).label('pre_tax'),
        func.sum(Expense.tax_amount).label('tax'),
        func.date_trunc('month', Expense.date).label('month'))\
        .group_by(func.date_trunc('month', Expense.date))\
        .order_by('month')

    monthlyExpenses = []
    company.monthlyExpenses = []
    for row in result.all():
        company.monthlyExpenses.append(
            MonthlyExpense(formatMonth(row.month), row.pre_tax, row.tax))

        monthlyExpenses.append(
            MonthlyExpense(formatMonth(row.month), row.pre_tax, row.tax))
    return monthlyExpenses


def formatMonth(date):
    return str(date).split(" ")[0][0:7]


class MonthlyExpense():
    def __init__(self, month, preTax, tax):
        self.month = month
        self.preTax = preTax
        self.tax = tax
        self.total = self.preTax + self.tax


class Company():
    monthlyExpenses = []
    name = ""


if __name__ == '__main__':
    company = Company()
    app.secret_key = 'kexin'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
