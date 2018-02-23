from django.shortcuts import render
import csv
from django.contrib import messages
from .models import Expenses


# display upload form
def index(request):
    return render(request, "expenses/index.html", locals())


# parse uploaded CSV & insert into DB
def upload_csv(request):
    data = ''
    if request.POST.get('csv_file') and request.FILES:
        file = request.FILES['file']
        if not file.name.endswith('.csv'):
            messages.error(request, 'File is not a CSV')
        decoded_file = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:
            new_record = Expenses(
                date=row[0],
                category=row[1],
                name=row[2],
                address=row[3],
                description=row[4],
                pretax=float(row[5].replace(',', '')),
                taxname=row[6],
                tax=float(row[7].replace(',', '')),
            )
            try:
                new_record.save()
            except Exception as e:
                data = 'cant save yo'
                messages.error(request, "Unable to upload file. " + repr(e))
        return render(request, "expenses/index.html", {'data': data})


# fetches stored model & display
