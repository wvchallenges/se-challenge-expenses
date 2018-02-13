'''
Created on Feb 10, 2018

@author: ezliuti
'''
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from flask import Flask, render_template, redirect, request, abort, url_for, json
from .models import db, ExpensesTable, TotalExpensesPerMonth, FileTable
from werkzeug.utils import secure_filename
from .utils import parse_csv, calculate_total_expenses




app = Flask(__name__)

app.config['DEBUG'] = True
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL',
                                                  "mysql://root:root@localhost/test")

db.init_app(app)


@app.cli.command('initdb')
def initdb():
    """Initializes the database."""
    db.init_app(app)
    db.create_all()
    print('Initialized the database.')


@app.route('/upload', methods = ['POST', 'GET'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        upload_directory = os.path.join(os.path.dirname(__file__), 'files')
        if not os.path.exists(upload_directory):
            os.mkdir(upload_directory)
        file_name = secure_filename(f.filename)
        existed_file = FileTable.query.filter(file_name == file_name).first()
        if not existed_file:
            new_file = FileTable(file_name = file_name)
            db.session.add(new_file)
        upload_path = os.path.join('files', file_name)
        f.save(upload_path)
        data = parse_csv(upload_path)
        expense = calculate_total_expenses(data)
        for record in data:
            new_record = ExpensesTable(
                date = record[0],
                category = record[1],
                employee_name = record[2],
                employee_address = record[3],
                expense_description = record[4],
                pre_tax = float(record[5].replace(',', '')),
                tax_name = record[6],
                tax = float(record[7].replace(',', '')),
                file_name = file_name,
                )
            db.session.add(new_record)
        for record in expense:
            new_record = TotalExpensesPerMonth(
                month = record['month'],
                expense = record['expense'],
                file_name = file_name
                )
            db.session.add(new_record)
        db.session.commit()
        return redirect(url_for('upload'))
    return render_template('upload.html')

@app.route('/', methods = ['GET'])
def index():
    file_list = ExpensesTable.query.all()
    return render_template('index.html', file_list = file_list)

@app.route('/upload/<int:file_id>', methods = ['GET'])
def view_upload_file(file_id):
    record = ExpensesTable.query.filter_by(id = file_id).first()
    return render_template('file_detail.html', record = record)
#
@app.route('/upload/<int:file_id>/expense-detail', methods = ['GET'])
def view_expense_detail(file_id):
    file_name = ExpensesTable.query.filter_by(id = file_id).first().file_name
    record = TotalExpensesPerMonth.query.filter_by(file_name = file_name).order_by('month').all()
    return render_template('expense_detail.html', record = record)

if __name__ == "__main__":
    app.run()
