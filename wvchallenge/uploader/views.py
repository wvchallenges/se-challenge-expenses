from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import Expense
import csv, locale, decimal

'''
This helper function saves chunks of large upload to an output file.
Using chunks prevents overwhelming the web server when large files are uploaded
'''
def save_data(csv):
    with open(csv.name, 'wb+') as csvfile:
        for chunk in csv.chunks():
            csvfile.write(chunk)
    return csv.name


'''
This helper function reads a CSV file and saves contents into a model
'''
def load_data(f):
    # enable locale to allow converting dollar amounts 
    # separated by ',' to floating point numbers 
    locale.setlocale(locale.LC_ALL,'en_US.UTF-8')

    with open(f, 'r') as csvfile:
        reader = csv.reader(csvfile)
        lineid = 0
        for line in reader:
            lineid += 1
            if lineid == 1: # skip header line 
                continue

            # create model object
            qry = Expense(expense_date=line[0],
               category=line[1],
               employee_name=line[2],
               employee_address=line[3],
               expense_description=line[4],
               pretax_amount=locale.atof(line[5]), # transform string to float
               tax_name=line[6],
               tax_amount=locale.atof(line[7]))    # transform string to float

            qry.save()


'''
index - handles http get and post request
      - when post, stores uploaded file to the database
      - when get, returns aggregate expenses in each month
'''
def index(request):
    if request.method == 'POST':
        # validate form input
        if not 'expense' in request.FILES:
            #TODO: for debugging, must be removed
            Expense.objects.all().delete()
            return HttpResponseRedirect('/')

        data = request.FILES['expense']

        # store the uploaded file
        file_name = save_data(data)

        # migrate data in csv to database 
        # Ideally, perform csv file validation before storing to the database
        load_data(file_name)

        # redirect to home page to prevent form resubmission on page reload
        return HttpResponseRedirect('/')

    elif request.method == 'GET':
        # get all rows from 'Expense' table.
        # use QuerySet.values to return a dictionary instead of model instance
        expenses = Expense.objects.all().values()

        # template context
        context = {'expenses' : []}
        exp = Expense.objects.values('expense_date', 'tax_amount', 'pretax_amount')
        output = {}
        for r in exp:
            month = r.get('expense_date').strftime('%m-%Y')
            if month not in output:
                output[month] = decimal.Decimal(0.0)

            # total expense = pretax_amount + tax_amount
            output[month] += r.get('tax_amount') + r.get('pretax_amount')

        # prep context for template
        for i in output:
            context['expenses'].append({'month' : i, 'expense' : output[i]})

        template = loader.get_template('uploader/index.html')
        return HttpResponse(template.render(context, request))

