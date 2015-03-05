from .models import ExpenseCategory, Employee, TaxType, Expense
import csv
from datetime import datetime
from decimal import Decimal
from django.db import transaction


def clean_currency_str(text):
    return text.strip().replace(',', '')


def import_csv_expenses(csv_file):
    DATE_FORMAT = '%m/%d/%Y'

    DATE = 0
    CATEGORY = 1
    EMPLOYEE_NAME = 2
    EMPLOYEE_ADDR = 3
    DESCRIPTION = 4
    PRE_TAX_AMT = 5
    TAX = 6
    TAX_AMT = 7

    # delete old data
    Expense.objects.all().delete()
    TaxType.objects.all().delete()
    Employee.objects.all().delete()
    ExpenseCategory.objects.all().delete()

    csv_reader = csv.reader(csv_file)

    # skip header
    csv_reader.next()
    
    with transaction.atomic():
        for row in csv_reader:
            row = map(str.strip, row)

            # get/create category
            category, is_created = ExpenseCategory.objects.get_or_create(name=row[CATEGORY])

            # get/create/update employee
            employee, is_created = Employee.objects.get_or_create(name=row[EMPLOYEE_NAME])
            if employee.address != row[EMPLOYEE_ADDR]:
                employee.address = row[EMPLOYEE_ADDR]
                employee.save()

            # get or create tax
            tax, is_created = TaxType.objects.get_or_create(name=row[TAX])

            # create expense
            expense = Expense(category=category, employee=employee, tax=tax)
            expense.expense_date = datetime.strptime(row[DATE], '%m/%d/%Y')
            expense.description = row[DESCRIPTION]
            expense.pretax_amount = Decimal(clean_currency_str(row[PRE_TAX_AMT]))
            expense.tax_amount = Decimal(clean_currency_str(row[TAX_AMT]))
            expense.total_amount = expense.pretax_amount + expense.tax_amount
            expense.save()
