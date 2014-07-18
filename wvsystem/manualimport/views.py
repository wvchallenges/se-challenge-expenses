from django.shortcuts import render
from .models import Expense, Employee, Tax, Category
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django import forms
from django.forms.util import ErrorList
from django.core.exceptions import NON_FIELD_ERRORS
from django.db.models import Sum
from chartit import DataPool, Chart
import locale
import csv
from datetime import datetime


def import_from_file(tmpfile):
    locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
    header = []
    csvreader = csv.reader(tmpfile)
    for row in csvreader:
        if header == []:
            header = row
            continue
        else:
            record = dict(zip(header, row))
            try:
                pta = locale.atof(record['pre-tax amount'])
                ta = locale.atof(record['tax amount'])

                employee, created = Employee.objects.get_or_create(
                    name=record['employee name'],
                    address=record['employee address']
                )
                category, created = Category.objects.get_or_create(
                    name=record['category']
                )
                tax, created = Tax.objects.get_or_create(
                    name=record['tax name']
                )

                expense, created = Expense.objects.get_or_create(
                    date=datetime.strptime(record['date'], '%m/%d/%Y').date(),
                    employee=employee,
                    category=category,
                    tax=tax,
                    description=record['expense description'],
                    pre_tax_amount=pta,
                    tax_amount=ta,
                    total_amount=pta+ta
                )
            except:
                return False, 'Parsing error '+str(tmpfile)+'@line'+str(csvreader.line_num)
    return True, 'Success'


def form(request):
    class ImportForm(forms.Form):
        file  = forms.FileField( label="Please select a CSV file")
        def add_error(self, message):
            self._errors[NON_FIELD_ERRORS] = ErrorList()
            self._errors[NON_FIELD_ERRORS].append(message)



    if request.POST:
        form = ImportForm(request.POST, request.FILES)
    else:
        form = ImportForm()

    if form.is_valid():
        imported, message = import_from_file(request.FILES['file'])
        if imported:
            return HttpResponseRedirect('index')
        else:
            form.add_error(message)

    context= {'user' : request.user,
              'request' : request,
              'form': form
              }

    return render(request,
                  'manualimport/form.html',
                  context,
                  context_instance=RequestContext(request)
                  )


def index(request):
    context= {'user' : request.user,
              'request' : request
              }

    expenses_per_month = Expense.objects.all().\
        extra(select={'month': "strftime('%Y / %m', date)"}).\
        values('month').\
        annotate(total_per_month=Sum('total_amount')
                 ).order_by('month')

    context['expenses_per_month'] = expenses_per_month

    ds = DataPool(
        series=[{'options': {
            'source': Expense.objects.all()
        },
            'terms': [
                'description',
                'total_amount'
            ]}
        ])

    chart = Chart(
        datasource=ds,
        series_options=[{'options': {
            'type': 'pie',
            'stacking': False},
            'terms': {
                'description': [
                    'total_amount'
                ]
            }}])

    context['chart'] = chart

    return render(request,
                  'manualimport/index.html',
                  context,
                  context_instance=RequestContext(request)
                  )
