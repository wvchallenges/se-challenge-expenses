from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .models import Expenses
import csv
import codecs
import re
from datetime import datetime

# View to upload the CSV
def index(request):
    if request.POST and request.FILES:
        # Open the CSV, and parse it into a dictionary
        csvfile = request.FILES['csv_file']
        csvfile.open()
        reader = csv.DictReader(csvfile)
        # Using the dictionary, organise the data into
        # month-by-month summations
        monthlyTaxes = {}
        for row in reader:
            # Create and save this expense to the database
            expense = Expenses()
            expense.date = datetime.strptime(row['date'], '%m/%d/%Y').isoformat()[:10]
            expense.employee_name = row['employee name']
            expense.employee_address = row['employee address']
            expense.category = row['category']
            expense.description = row['expense description']
            expense.pretax = row['pre-tax amount'].replace(',','')
            expense.tax_name = row['tax name']
            expense.tax = row['tax amount'].replace(',','')
            expense.save()
            
            # This is the part where we fill up the monthly taxes
            # dictionary.
            
            # Pattern to match first 1-2 numbers, and last 4
            month_match = re.match('^(\d{1,2}\/).*(\d{4})$', row['date'])
            month = month_match.group(1) + month_match.group(2)
            # Add the pre-tax amount to the entry in the dictionary
            if month in monthlyTaxes:
                monthlyTaxes[month] += float(row['pre-tax amount'].replace(',','')) + float(row['tax amount'].replace(',',''))
            else: # ... or, add the month to the dictionary
                monthlyTaxes[month] = float(row['pre-tax amount'].replace(',','')) + float(row['tax amount'].replace(',',''))

        # Set context for the view
        context = {
            'reader': reader,
            'monthlyTaxes': monthlyTaxes,
        }
        return render(request, 'index.html', context)
    else:
        return render(request, 'index.html')