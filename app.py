#!/usr/bin/env python
import csv
import re
import model
import pdb

from bottle import Bottle, run, request, redirect, template
from datetime import datetime

def sanitized_amount(string):
  '''returns a float representing a monetary sum'''
  non_decimal = re.compile('[^\d.]+')
  amount = non_decimal.sub('', string)
  return float(amount)

def process_input(file, session):
  '''imports file into the database
  does not check for duplicate expenses
  '''
  next(file) #skip header
  for cells in csv.reader(file):
    employee = model.get_or_create(
      session, model.Employee,
      full_name=cells[2],
      address=cells[3]
    )
    date = datetime.strptime(cells[0], '%m/%d/%Y')
    expense = model.Expense(
      date=date,
      category=cells[1],
      description=cells[4],
      pre_tax_amount=sanitized_amount(cells[5]),
      tax_amount=sanitized_amount(cells[7]),
      tax_name=cells[6],
      employee_id = employee.id,
      transaction_year = date.year,
      transaction_month = date.month
    )
    session.add(expense)
    session.commit()

def build_app(session):
  app = Bottle()

  @app.route('/')
  def main():
    return '''
  <div style="background: red">
    <form action="/upload" method="post" enctype="multipart/form-data"
          style="margin: 0 auto; padding-top: 200px; width: 400px; height: 100%;
          background: blanchedalmond; text-align: center;">
      Select CSV to upload:<br><br>
      <input type="file" accept='.csv' name="upload"/><br><br>
      <input type="submit" value="Start upload"/>
    </form>
  </div>
    '''

  @app.route('/upload', method='POST')
  def upload():
    upload = request.files.get('upload')
    if upload:
      process_input(upload.file, session)
      redirect('/monthly_expense')
    else:
      redirect('/')

  @app.route('/monthly_expense')
  def monthly_expense():
    breakdown = model.expense_breakdown_monthly(session)
    breakdown = [("{}/{}".format(b[0], b[1]), b[2]+b[3]) for b in breakdown]
    headers = "Month,Total Expenses".split(',')
    return template("templates/monthly_expenses", rows=breakdown, headers=headers)

  return app


if __name__ == '__main__':
  session = model.init_db()
  app = build_app(session)
  run(app, host='localhost', port=8080)
