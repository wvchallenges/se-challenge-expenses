# -*- coding: utf-8 -*-

"""
Wave Challenge submission.
A CSV uploader written with Flask.
Web app serves as a form to upload CSV files to.
User can then see the totals of the spending from
their accounts.
:author: Olsi Spahiu
:date: 08/21/2016
:license: GNU license agreement
"""

from locale import setlocale, LC_NUMERIC

import pandas as pd
from flask import Flask, request, redirect, flash, send_from_directory, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

# Global settings.
import helper

setlocale(LC_NUMERIC, '')
PERMITTED_FILE_EXTENSION = 'csv'  # The file extension that is permitted as an upload.

# Create Flask application.
app = Flask(__name__, instance_relative_config=True)
app.static_folder = 'static'
app.template_folder = 'templates'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///schema.db"
db = SQLAlchemy(app)


@app.route('/', methods=['GET', 'POST'])
def upload():
    # Check if request is a POST.
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file found in form.')
            return redirect(request.url)
        upload_file = request.files['file']
        file_name = upload_file.filename
        if not file_name:
            flash('No selected file.')
            return redirect(request.url)
        if upload_file and helper.check_file_extension(file_name):
            csv_frame = pd.read_csv(upload_file)
            send_csv_to_db(csv_frame)  # Store in database.
            sorted_expenses = helper.process_expenses(csv_frame)  # Calculate expenses.
            return render_template('expenses', file_name=file_name, expenses=sorted_expenses)

    return send_from_directory('', 'index.html')


def send_csv_to_db(csv_frame):
    """Stores CSV data frame in SQLite database."""
    address = "sqlite:///C:\Users\Olsi\Documents\Programming_Files\wave_challenge\se-challenge\schema.db"
    engine = create_engine(address)
    csv_frame.to_sql(name='csv', con=engine, if_exists='append', index=False)
    flash('CSV file stored in database.')


if __name__ == '__main__':
    # Run main, setup session.
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.debug = True
    app.run()
