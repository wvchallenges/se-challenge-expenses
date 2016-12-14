import csv
import datetime
import os
from decimal import Decimal
from django.conf import settings
from django.shortcuts import render
from .forms import EmployeeExpensesForm
from .models import EmployeeExpenses


def index(request):
    total_expenses = {}
    # If POST, process form data
    if request.method == 'POST':
        form = EmployeeExpensesForm(request.POST, request.FILES)
        if form.is_valid():
            expenses_csv = request.FILES['csv_file']

            # Write file to disk
            # ref: http://stackoverflow.com/a/14167671/198660
            csv_file_path = os.path.join(settings.BASE_DIR,
                                         'UPLOADED',
                                         expenses_csv.name)
            fout = open(csv_file_path, 'wb')
            for chunk in expenses_csv.chunks():
                fout.write(chunk)
            fout.close()

            # Read uploaded file and add to database
            # ref: https://docs.python.org/3/library/csv.html#csv.DictReader
            with open(csv_file_path) as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    expense_date = datetime.datetime.strptime(row['date'],
                                                              '%m/%d/%Y')
                    pretax = Decimal(row['pre-tax amount'].replace(',', ''))
                    tax = Decimal(row['tax amount'].replace(',', ''))
                    expenses = EmployeeExpenses(
                        date=expense_date,
                        category=row['category'],
                        employee_name=row['employee name'],
                        employee_address=row['employee address'],
                        expense_description=row['expense description'],
                        pretax_amount=pretax,
                        tax_name=row['tax name'],
                        tax_amount=tax,
                    )
                    expenses.save()
                    # To parse out date+expense from this upload
                    current_month = expense_date.strftime('%Y-%m')
                    monthly_expense_total = total_expenses.get(current_month,
                                                               Decimal(0))
                    total_expenses[current_month] = monthly_expense_total + \
                                                    pretax + tax
            pass
        pass  #TODO: stuff

    # If GET (or any other method), create blank form
    else:
        form = EmployeeExpensesForm()

    context = {
        'form': form,
        'total_expenses': total_expenses,
    }
    return render(request, 'csvupload/index.html', context)

# Create your views here.
