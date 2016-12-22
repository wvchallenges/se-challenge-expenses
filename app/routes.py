# -*- encoding: utf-8 -*-
from app import app
from app.repositories.expense import ExpenseRepository
from flask import render_template, request


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/expenses', methods=['POST'])
def upload():
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)

    expense = ExpenseRepository()
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    expense.from_csv(file)
    return render_template('index.html')


@app.route('/expenses/<company_id>')
def show(company_id=None):
    return render_template('index.html', company_id=None)
