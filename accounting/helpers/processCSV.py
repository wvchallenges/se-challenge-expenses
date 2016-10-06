import pandas as pd
import numpy
import os
import sqlite3
from django.conf import settings

from ..models import Employees, Expenses

def process_csv(uploaded_file):
    uploaded_file_df = pd.read_csv(uploaded_file, header=0, encoding='ISO-8859-1')

    # Rename columns to match those in the model
    uploaded_file_df.rename(columns={'employee name':'name', 'employee address':'address',
                                    'expense description':'description','pre-tax amount':'pre_tax_amount',
                                    'tax name':'tax_name','tax amount':'tax_amount'}, inplace=True)

    # Get distinct employees
    employees_uploaded = uploaded_file_df[['name', 'address']].drop_duplicates()

    # Before saving the employees to the accounting_employees relation, we must find out if this operation will
    # introduce duplicates. Lets get the existing employees first.

    con = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    con = sqlite3.connect(con)

    employees_existing = pd.DataFrame.from_records(Employees.objects.all().values())

    # Concate these records and the employees uploaded, and then remove all duplicates.

    employees_uploaded = pd.concat([employees_existing, employees_uploaded])
    employees_uploaded = employees_uploaded.drop_duplicates(subset=['name', 'address'], keep=False)

    # Once duplicates are dropped, save employees to the relation
    with con:
        employees_uploaded.to_sql("accounting_employees", con=con, index=False, flavor='sqlite', if_exists='append')

    # # Get latest records along with their assigned primary keys
    employees_existing = pd.DataFrame.from_records(Employees.objects.all().values())

    # Merge employees and expenses to save employee id in the expenses relation
    # This assumes that employee name and address cannot contain a missing value in any tuple
    merge_attributes = ['name', 'address']
    expenses_uploaded = employees_existing.dropna(subset=merge_attributes, how='any').merge(uploaded_file_df.dropna(subset=merge_attributes, how='any'), on=merge_attributes, right_index=True)

    # Finally, drop name and address columns from the expenses and rename the id column to employee_id to indicate that it
    # is a foreign key

    expenses_uploaded.drop(['name', 'address'], axis=1, inplace=True)
    expenses_uploaded.rename(columns={'id':'employee_id'}, inplace=True)

    
    # Save expenses to the expenses relation
    with con:
        expenses_uploaded.to_sql("accounting_expenses", con=con, index=False, flavor='sqlite', if_exists='append')
