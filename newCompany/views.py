from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from newCompany.models import Database
from newCompany.forms import FileUploader
from datetime import datetime
import csv

# Create your views here.


def data(request):
    all_db_rows = Database.objects.all()
    template = loader.get_template('newCompany/index.html')
    context = {
        'all_data': all_db_rows
    }

    return HttpResponse(template.render(context, request))


def upload(request):
    if request.method == 'POST':
        Database.objects.all().delete
        parseFile(request.FILES['databaseCSV'])

        return monthly(request)
    return render(request, 'newCompany/upload.html')


def monthly(request):
    values = Database.objects.annotate(month=TruncMonth('Date')).values(
        'month').annotate(total=Sum('TaxAmt'))
    template = loader.get_template('newCompany/monthly.html')
    context = {
        'monthly_tax': values
    }
    return HttpResponse(template.render(context, request))


def parseFile(f):
    reader = csv.reader(f, delimiter=',', quotechar='"')
    fileColumns = next(reader)
    for line in reader:
        dateValue = datetime.strptime(line[0], "%m/%d/%Y").date()
        preTaxAmt = float(line[5].replace(',', ''))
        taxAmt = float(line[7].replace(',', ''))
        data = Database(Date=dateValue,
                        Category=line[1],
                        EmployeeName=line[2],
                        EmployeeAddress=line[3],
                        ExpenseDesc=line[4],
                        PreTaxAmt=preTaxAmt,
                        TaxName=line[6],
                        TaxAmt=taxAmt)
        data.save()
