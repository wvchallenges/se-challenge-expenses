from django.shortcuts import render
from django.template.context_processors import csrf
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from .models import Expense
from csv import reader
from decimal import Decimal
from django.db.models import F, FloatField, Sum
from os import path, remove

fs = FileSystemStorage()


def home(request):
    if request.method == "POST" and request.FILES['file']:
        File = request.FILES['file']
        if path.isfile(settings.MEDIA_ROOT + '/' + File.name):
            remove(settings.MEDIA_ROOT + '/' + File.name)
        Name = fs.save(File.name, File)
        Lines = reader(open(settings.MEDIA_ROOT + '/' + File.name))
        Lines.__next__()  # skip the header
        write_to_database(Lines)
        return render(request, 'success.html', {'Name': Name, 'List': read_from_database()})
    return render(request, 'home.html', csrf(request))


def write_to_database(Lines):
    Expense.objects.all().delete()
    for line in Lines:
        date = line[0].split('/')
        line[0] = date[2] + '-' + date[0] + '-' + date[1]
        line[5] = Decimal(line[5].replace(',', ''))
        line[7] = Decimal(line[7].replace(',', ''))
        expense = Expense(date=line[0], category=line[1], name=line[2], address=line[
                          3], description=line[4], pretax_amount=line[5], tax_name=line[6], tax_amount=line[7])
        expense.save()


def read_from_database():
    DateList = Expense.objects.order_by('date')
    MinDate = DateList[0].date
    MaxDate = DateList[len(DateList) - 1].date
    Months = MaxDate.month + (MaxDate.year - MinDate.year) * 13 - MinDate.month
    y = MinDate.year
    m = MinDate.month
    L = []
    for i in range(Months):
        t = Expense.objects.filter(date__year=y, date__month=m)
        sum = t.aggregate(sum=Sum(F('pretax_amount') +
                                  F('tax_amount'), output_field=FloatField()))['sum']
        L.append([y, m, sum])
        m = m + 1
        if m > 12:
            y = y + 1
            m = 0
    return L
