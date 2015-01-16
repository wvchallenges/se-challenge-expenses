# -*- coding: utf-8 -*-

from flask import Flask, request, render_template, redirect, url_for
import pandas as pd
import numpy as np
import psycopg2

from psycopg2.extras import RealDictCursor

from cStringIO import StringIO

app = Flask(__name__)
app.config.from_pyfile('config.py')


def _get_connection_and_cursor():

    database = psycopg2.connect(
        host=app.config['POSTGRES_HOST'],
        database=app.config['POSTGRES_DATABASE'],
        user=app.config['POSTGRES_USER'])

    cursor = database.cursor(cursor_factory=RealDictCursor)

    return database, cursor


def _drop_tables():

    database, cursor = _get_connection_and_cursor()
    table_names = ['employees', 'categories', 'taxes', 'expenses']
    for table_name in table_names:
        query = "DELETE FROM %s" % table_name
        cursor.execute(query)

    database.commit()


def _save_dataframe_to_table(data, table_name):

    database, cursor = _get_connection_and_cursor()

    string_buffer = StringIO()
    data.to_csv(string_buffer, sep='\t', header=False, index=False)
    string_buffer.seek(0)

    columns = tuple(['"%s"' % column_name for column_name in data.columns.values])

    cursor.copy_from(string_buffer, table_name, columns=columns)
    database.commit()


def _get_unique_entries(dataframe, columns, index_name='id'):

    uniques = dataframe.drop_duplicates(columns)[columns]
    uniques = uniques.reindex().reset_index()
    uniques = uniques.rename(columns={'index': index_name})

    return uniques


@app.route('/')
def index():
    return redirect(url_for('file_upload_form'))


@app.route('/file_upload')
def file_upload_form():
    return render_template('file_upload.j2.html')


@app.route('/accept_file', methods=['POST'])
def accept_file():

    file = request.files['data.csv']

    expenses = pd.read_csv(
        file,
        parse_dates=['date'],
        thousands=',',
        dtype={'tax amount': np.float64, 'pre-tax amount': np.float64})

    _drop_tables()

    employees = _get_unique_entries(
        expenses,
        ['employee name', 'employee address'],
        index_name='employee_id')

    employees = employees.rename(
        columns={
            'employee name': 'name',
            'employee address': 'address'
        })

    _save_dataframe_to_table(employees, 'employees')

    categories = _get_unique_entries(
        expenses,
        ['category'],
        index_name='category_id')

    categories = categories.rename(
        columns={
            'category': 'name'
        })

    _save_dataframe_to_table(categories, 'categories')

    taxes = _get_unique_entries(
        expenses,
        ['tax name'],
        index_name='tax_id')

    taxes = taxes.rename(
        columns={
            'tax name': 'name'
        })

    _save_dataframe_to_table(taxes, 'taxes')

    expenses = expenses.merge(
        employees.drop('address', axis=1),
        how='left', left_on='employee name', right_on='name')

    expenses = expenses.merge(categories, how='left', left_on='category', right_on='name')
    expenses = expenses.merge(taxes, how='left', left_on='tax name', right_on='name')

    expenses = expenses.drop([
        'employee name', 'employee address',
        'category', 'tax name',
        'name_x', 'name_y', 'name'
    ], axis=1).reset_index().rename(columns={'index': 'expense_id'})

    _save_dataframe_to_table(expenses, 'expenses')

    return redirect(url_for('data'))


@app.route('/data')
def data():

    query = """SELECT to_char(date, 'Month YYYY') AS month,
        SUM("pre-tax amount" + "tax amount") AS sum

        FROM expenses
        GROUP BY to_char(date, 'Month YYYY')
    """

    database, cursor = _get_connection_and_cursor()
    cursor.execute(query)

    return render_template('data.j2.html', rows=cursor.fetchall())


if __name__ == '__main__':
    app.run(host='0.0.0.0')
