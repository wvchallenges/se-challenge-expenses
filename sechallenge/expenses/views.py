from django.shortcuts import render
from django.contrib import messages
from .models import Expenses
import csv
import datetime


# display upload form
def index(request):
    return render(request, "expenses/index.html", locals())


# parse uploaded CSV & insert into DB
def upload_csv(request):
    if request.method == 'POST' and request.FILES['csv_file']:
        file = request.FILES['csv_file']
        if not file.name.endswith('.csv'):
            messages.error(request, 'File is not a CSV')
        decoded_file = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:
            new_record = Expenses(
                date=datetime.datetime.strptime(row['date'], '%m/%d/%Y').date(),
                category=row['category'],
                name=row['employee name'],
                address=row['employee address'],
                description=row['expense description'],
                pretax=float(row['pre-tax amount'].replace(',', '')),
                taxname=row['tax name'],
                tax=float(row['tax amount'].replace(',', '')),
            )
            try:
                new_record.save()
            except Exception as e:
                messages.error(request, 'Unable to upload file. ' + repr(e))
    # return view_expenses(). don't return new view
    return render(request, 'expenses/upload_csv.html', locals())


# fetches stored model & display
# def view_expenses():
#
#     return render(request, 'expenses/upload_csv.html', {'expense': data})
