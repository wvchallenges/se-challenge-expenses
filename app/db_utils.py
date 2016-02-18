import sqlite3
from datetime import datetime, date
from flask import current_app as app

# Just some SQL constants
num_of_expenses = "select count(*) from expenses"
expenses_by_month = """
    select strftime('%Y-%m', expense_date) as month, sum(pretax_amount) + sum(tax_amount) as total
    from expenses
    group by month
    order by month asc
    """
expenses_by_employee = """
    select employee_name, sum(pretax_amount) + sum(tax_amount) as total
    from expenses
    group by employee_name
    order by total desc
    limit 20
    """
insert_expense = """
    insert into expenses
    (expense_date, category, employee_name, employee_address, expense_description, tax_name, pretax_amount, tax_amount)
    values (?, ?, ?, ?, ?, ?, ?, ?)
    """

def connect_db():
    conn = sqlite3.connect(app.config['DATABASE'], detect_types=sqlite3.PARSE_DECLTYPES)
    conn.row_factory = sqlite3.Row
    return conn

# Make sure the date is compliant with Sqlite3's date type
def convert_datetime(date):
    return datetime.strptime(date, "%m/%d/%Y").date().strftime('%Y-%m-%d')

def money_convert(string):
    return int(float(string.replace(",", "")) * 100)
