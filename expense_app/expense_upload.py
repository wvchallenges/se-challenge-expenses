from bottle import Bottle, request, route, template
import csv
import datetime
import os

from expense_app.constants.constants import EXPENSE_TABLE_TEMPLATE, EXPENSE_UPLOAD_TEMPLATE
from expense import Expense
from session import rw_session

app = Bottle()

##################################
# helpers functions
##################################
def get_month_day_year(date):
  date = date.split('/')
  return int(date[0]), int(date[1]), int(date[2])

def get_valid_float(string):
  result = ''
  for char in string:
    if char != ',':
      result += char
  return float(result)

def put_year_to_month_expenses(year_to_month_expenses, year, month, expense):
  try:
    expenses = year_to_month_expenses[year][month]
    expenses.append(expense)
    year_to_month_expenses[year][month] = expenses
  except:
    # either the year is not set or the month is not set correctly
    # get or set the year
    year_months = year_to_month_expenses.get(year, {})
    year_to_month_expenses[year] = year_months
    # update the months expense
    expenses = year_to_month_expenses[year].get(month, 0)
    expenses += get_valid_float(expense['pre-tax amount']) + \
      get_valid_float(expense['tax amount'])
    year_to_month_expenses[year][month] = expenses

  return year_to_month_expenses

def parse_csv(file_path):
  year_to_month_expenses = {}

  # save to database
  with open(file_path) as csvfile:
    reader = csv.DictReader(csvfile)

    with rw_session() as session:
      for row in reader:
        month, day, year = get_month_day_year(row['date'])
        date = datetime.datetime(year, month, day)
        expense = Expense(date, row['category'], row['employee name'], row['employee address'],
          row['expense description'], get_valid_float(row['pre-tax amount']), row['tax name'],
          get_valid_float(row['tax amount']))
        session.add(expense)

        year_to_month_expenses = put_year_to_month_expenses(
          year_to_month_expenses, year, month, row)

  return year_to_month_expenses

def get_csv_save_path(filename):
  return os.path.dirname(os.path.realpath(__file__)) + '/csv/' + filename

##################################
# routes
##################################
@app.route('/expense-upload')
def get_expense_upload():
  return template(EXPENSE_UPLOAD_TEMPLATE)

@app.route('/expense-upload', method='POST')
def post_expense_upload():
  data = request.files.data
  name, ext = os.path.splitext(data.filename)
  if ext not in ('.csv'):
    return 'File extension not allowed.'

  save_path = get_csv_save_path(data.filename)
  data.save(save_path, overwrite=True)

  year_to_month_expenses = parse_csv(save_path)
  return template(EXPENSE_TABLE_TEMPLATE,
      year_to_month_expenses=year_to_month_expenses)
