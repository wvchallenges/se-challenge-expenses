from django.shortcuts import render_to_response
from django.template import RequestContext
from importfile.models import Expense
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db import connection
from decimal import Decimal
import datetime
import string
import csv

# Create your views here.
def main(request):
    
    if request.method == 'POST':
        #add the filename with a data stamp so that we can display the unique results for every new file
        filename = request.FILES['fileUpload'].name + str(datetime.datetime.now())
        
        #when the file is uploaded we grab the object of the file and read it using csv.reader
        dataReader = csv.reader(request.FILES['fileUpload'])
        #we ignore the headers by skipping over the first line of the file
        next(dataReader, None)
        
        #we iterate over the file
        for row in dataReader:
            expense = Expense()
            expense.expense_date = row[0]
            #Here we convert the string date in the file into a DateField
            expense.expense_date = datetime.datetime.strptime(expense.expense_date, "%m/%d/%Y").strftime("%Y-%m-%d")
            expense.category = row[1]
            expense.employee_name = row[2]
            expense.employee_address = row[3]
            expense.expense_description = row[4]
            expense.pre_tax_amount = row[5]
            #we need to strip the ',' out of numbers such a 1,999 so that they can be
            #converted into Decimal numbers
            expense.pre_tax_amount = string.replace(expense.pre_tax_amount, ',', '')
            expense.tax_name = row[6]
            expense.tax_amount = row[7]
            expense.tax_amount = string.replace(expense.tax_amount, ',', '')
            #This is the total amount represent by the amount pre-tax + the tax
            expense.total_amount = Decimal(expense.tax_amount) + Decimal(expense.pre_tax_amount)
            expense.file_name = filename
            expense.save()
        return custom_redirect('importfile.views.results', name=filename)
            
    return render_to_response('importfile/main.phtml',  context_instance=RequestContext(request))

def results(request):
    #grab the file name from the url, if nothing is there the result is ''
    file_name =  request.GET.get('name', '')
    
    cursor = connection.cursor()
    #here we do a mysql statement to group the results by month/year for a specific file
    #the problem here is that you are relying on a sql statement, ideally I would have liked to use the django ORM
    cursor.execute("select expense_date, sum(total_amount) \
    from importfile_expense \
    where file_name = '"+file_name+"' \
    group by DATE_FORMAT(expense_date, '%Y%m') \
    order by expense_date")
    
    expenses = cursor.fetchall()
    
    return render_to_response('importfile/results.phtml', {'monthly_expenses': expenses},  context_instance=RequestContext(request))

""" This is just a helper method to add parameters to the URL
    reference: http://stackoverflow.com/questions/3765887/add-request-get-variable-using-django-shortcuts-redirect
"""
def custom_redirect(url_name, **kwargs): 
    import urllib
    url = reverse(url_name)
    params = urllib.urlencode(kwargs)
    return HttpResponseRedirect(url + "?%s" % params)