from django.shortcuts import render_to_response
from django.template import RequestContext
from .forms import UploadFileForm
from models import *
import datetime
import re


# Create your views here.
def index(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        process_file(request.FILES['data'])
        return render_to_response('dataimport/report.html', RequestContext(request))
    return render_to_response('dataimport/index.html', RequestContext(request))


def process_file(f):
    line_number = 0
    for chunk in f.chunks():
        for line in chunk.splitlines():
            line_number += 1
            if line_number == 1:
                continue
            print line
            pattern = re.compile(r'([^,]+),([^,]+),([^,]+),"([^"]+)",([^,]+),"?([^"]+)"?,([^,]+),"?([^"]+)"?')
            result = pattern.match(line)
            if not result:
                continue
            date = datetime.datetime.strptime(result.group(1), '%m/%d/%Y')
            print str(date)
            category = result.group(2)
            name = result.group(3)
            address = result.group(4)
            description = result.group(5)
            print description
            amount = float(result.group(6).replace(',', '').strip())
            tax_type = result.group(7)
            print tax_type
            tax_amount = float(result.group(8).replace(',', '').strip())

            if not Category.objects.filter(name=category).exists():
                new_category = Category(name=category)
                new_category.save()

            target_category = Category.objects.filter(name=category).first()

            if not TaxType.objects.filter(name=tax_type).exists():
                new_tax_type = TaxType(name=tax_type)
                new_tax_type.save()

            target_tax_type = TaxType.objects.filter(name=tax_type).first()

            if not Employee.objects.filter(name=name, address=address).exists():
                new_employee = Employee(name=name, address=address)
                new_employee.save()

            target_employee = Employee.objects.filter(name=name, address=address).first()

            new_expense_entry = Expense(date=date,
                                        amount=amount,
                                        tax_amount=tax_amount,
                                        tax_type=target_tax_type,
                                        owner=target_employee,
                                        category=target_category,
                                        description=description)

            new_expense_entry.save()





