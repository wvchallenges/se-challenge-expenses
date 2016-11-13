from django.shortcuts import render
from django.http import HttpResponse

import csv
import json
from collections import namedtuple, defaultdict, OrderedDict
from datetime import datetime 
from decimal import Decimal 

from .models import EmployeeExpenseModel, ExpenseCategory, Employee, TaxName

def data_migrator_page(request):
    if request.method == 'GET':
        return render(request, 'data_migrator/data_migrator_page.html')

def view_data_page(request):
    if request.method == 'GET':
        expenses_by_month = defaultdict(Decimal)
        expenses = EmployeeExpenseModel.objects.all().order_by('expense_date')

        for expense in expenses:
            # Example: December 2015
            expense_month_year = expense.expense_date.strftime('%B %Y')
            expenses_by_month[expense_month_year] += expense.pre_tax_amount

        sorted_expenses = OrderedDict(sorted(expenses_by_month.items(), reverse=True))
        
        return render(request, 'data_migrator/view_data_page.html', {'sorted_expenses': sorted_expenses})

def upload_file(request):
    if request.method == 'POST':
        response_dict   = {}
        found_errors    = False
        csv_file        = request.FILES.get('csv-data-file', False)

        csv_string            = csv_file.read()
        load_csv_data_into_database(csv_string)

        return HttpResponse(json.dumps(response_dict), content_type='application/javascript')

def load_csv_data_into_database(csv_string):
    '''Create DB entries based on CSV data.'''
    csv_data_set    = _process_csv_file(csv_string)

    # Delete existing objects so that we don't keep
    # incrementing the totals
    EmployeeExpenseModel.objects.all().delete()

    for item in csv_data_set:
        # Create Employee if it doesn't already exist
        employee_name = item.emp_name.strip()
        employee_address = item.emp_address.strip()
        if not Employee.objects.filter(employee_name=employee_name).exists():
            employee = Employee(
                                employee_name=employee_name,
                                employee_address=employee_address
                            )
            employee.save()
        else:
            employee = Employee.objects.filter(employee_name=employee_name).first()

        # Create expense category if it doesn't already exist
        category_name = item.category.strip()
        if not ExpenseCategory.objects.filter(category_name=category_name).exists():
            expense_category = ExpenseCategory(category_name=category_name)
            expense_category.save()
        else:
            expense_category = ExpenseCategory.objects.filter(category_name=category_name).first()

        # Create tax name object if it doesn't already exist
        tax_name_raw = item.tax_name.strip()
        if not TaxName.objects.filter(tax_name=tax_name_raw).exists():
            tax_name = TaxName(tax_name=tax_name_raw)
            tax_name.save()
        else:
            tax_name = TaxName.objects.filter(tax_name=tax_name_raw).first()

        # Convert string to datetime object for expense date
        expense_date = datetime.strptime(item.date.strip(), '%m/%d/%Y')

        # Create new expense object
        expense = EmployeeExpenseModel(
                        employee=employee,
                        expense_category=expense_category,
                        expense_date=expense_date,
                        pre_tax_amount=Decimal(item.pre_tax_amount.strip().replace(',', '')),
                        tax_amount=Decimal(item.tax_amount.strip().replace(',', '')),
                        expense_description=item.expense_description.strip(),
                        tax_name=tax_name,
                    )
        expense.save()

def _process_csv_file(csv_string):
    '''Process csv data string and return list of tuples.'''
    csv_lines   = csv_string.splitlines()
    csv_reader  = csv.reader(csv_lines, delimiter=',')
    # Ingore the header
    next(csv_reader, None)

    CSVData = namedtuple(
                'CSVData',
                'date, category, emp_name, emp_address, expense_description, pre_tax_amount, tax_name, tax_amount'
                )

    csv_data_set = []

    for row in csv_reader:
        csv_data = CSVData(*row)
        csv_data_set.append(csv_data)

    return csv_data_set
