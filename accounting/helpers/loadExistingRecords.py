import pandas as pd
import numpy
import os
import sqlite3
from django.conf import settings

from ..models import Employees, Expenses

# This function computes an aggregation of expenses by month and returns results as a HTML table. 
def get_expenses():

    # Connect to SQLite database.
    con = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    con = sqlite3.connect(con)

    # Get expenses from the acounting_expenses relation tied to the Expenses model.

    expenses_existing = pd.read_sql_query("SELECT * FROM accounting_expenses", con)
    
    # Extract month and year using regexes.
    expenses_existing['month'] = expenses_existing.date.str.extract('^(\d{1,2})\/(\d{1,2})\/(\d{4})$')[0]
    expenses_existing['year'] = expenses_existing.date.str.extract('^(\d{1,2})\/(\d{1,2})\/(\d{4})$')[2]

    # Pandas seemed to read the pre_tax_amount attribute values as strings. Here, I'm converting all summarized column 
    # to numeric to ensure that no funny stuff happens later. 
    expenses_existing['pre_tax_amount'] = pd.to_numeric(expenses_existing['pre_tax_amount'], errors='coerce')
    expenses_existing['tax_amount'] = pd.to_numeric(expenses_existing['tax_amount'], errors='coerce')

    # Select only the columns to be displayed.
    expenses_existing = expenses_existing[['month', 'year', 'pre_tax_amount', 'tax_amount']]
    
    # If nonempty dataframe, return html table to be rendered on the UI
    if len(expenses_existing > 0):
        return expenses_existing.groupby(['month', 'year']).sum().reset_index().to_html(classes='table text-center', index=False).replace('border="1"','border="0"').replace('<th>','<th class=\'text-center\'> ')

    # Else return nothing
    else:
        return
