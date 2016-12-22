# -*- encoding: utf-8 -*-
from app import app
from app.repositories.expense import ExpenseRepository
from flask import render_template, request, make_response


def render_report(expenses):
    table_row = "Period %d/%d Total Expenses: %.2f, Total Taxes: %.2f\n"
    by_month = reduce(
        lambda res, (y, m, e, t): res + (table_row % (m, y, e, t)),
        expenses,
        ""
    )


@app.route('/expenses', methods=['POST'])
def upload():
    # check if the post request has the file part
    if 'file' not in request.files:
        return redirect(request.url)

    expense = ExpenseRepository()
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        return redirect(request.url)

    expense.from_csv(file)

    render_report(expense.by_month())

    return make_response(by_month)
