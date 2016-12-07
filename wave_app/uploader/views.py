from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.utils.datastructures import MultiValueDictKeyError

import csv

from datetime import datetime

from .models import Expenses
# Create your views here.

def index(request):

    return HttpResponse('This is the index page.')


def upload(request):

    return render(request, 'uploader/upload.html')


def totals(request):
    
    expenses = Expenses.objects.all()

    # Sum the monthly totals
    monthly_totals = {}
    for expense in expenses:
        date = expense.date.strftime('%b %Y')
        total_amount = expense.pt_amount + expense.tax_amount
        try:
            monthly_totals[date] += total_amount
        except KeyError:
            monthly_totals[date] = total_amount

    # Reverse sort the totals by date
    sorted_totals = [(date, monthly_totals[date])
                     for date in sorted(monthly_totals.iterkeys(),
                                        key=lambda w: datetime.strptime(w, '%b %Y'),
                                        reverse=True)]
    
    return render(request, 'uploader/totals.html', {'monthly_totals': sorted_totals, 'expenses': expenses})


def parse_csv(request):

    redirect_url = 'uploader:upload'
    
    if request.method == 'POST':
        try:
            file_raw = request.FILES['datafile']
        except MultiValueDictKeyError:
            pass
        else:
            rows = csv.reader(file_raw, skipinitialspace=True)
            next(rows, None) # Skip the header row
            for row in rows:
                
                date_str = row[0]
                category = row[1]
                name = row[2]
                address = row[3]
                description = row[4]
                pt_amount_str = row[5]
                tax_name = row[6]
                tax_amount_str = row[7]
                
                date = datetime.strptime(date_str, '%m/%d/%Y')
                pt_amount = float(pt_amount_str.replace(',', ''))
                tax_amount = float(tax_amount_str.replace(',', ''))
                
                
                e = Expenses(date=date,
                             category=category,
                             employee_name=name,
                             employee_address=address,
                             description=description,
                             pt_amount=pt_amount,
                             tax_name=tax_name,
                             tax_amount=tax_amount)
                
                e.save()

            redirect_url = 'uploader:totals'
            

    return HttpResponseRedirect(reverse(redirect_url))

