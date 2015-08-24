from django.shortcuts import render_to_response
from django.template import RequestContext
from .forms import UploadFileForm
from django.db import connection
from django.db.models import Sum, Count
from models import *
import datetime
import re


# Create your views here.
def index(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        current_batch = process_file(request.FILES['data'])
        truncate_date = connection.ops.date_trunc_sql('month', 'date')
        qs = Expense.objects.filter(batch=current_batch).extra({'month':truncate_date})
        report = qs.values('month').annotate(total_expense=Sum('amount')+Sum('tax_amount'))
        for row in report:
            row['month'] = datetime.datetime.strptime(row['month'], '%Y-%m-%d').strftime('%b %Y')
        return render_to_response('dataimport/report.html', RequestContext(request, {'report': report}))
    return render_to_response('dataimport/index.html', RequestContext(request))


def process_file(f):
    line_number = 0
    new_batch_record = UploadBatch(filename=f.name, upload_date=datetime.datetime.now())
    new_batch_record.save()

    current_batch_record = UploadBatch.objects.filter()
    for chunk in f.chunks():
        for line in chunk.splitlines():
            line_number += 1
            if line_number == 1:
                continue
            pattern = re.compile(r'([^,]+),([^,]+),([^,]+),"([^"]+)",([^,]+),"?([^"]+)"?,([^,]+),"?([^"]+)"?')
            result = pattern.match(line)
            if not result:
                continue
            date = datetime.datetime.strptime(result.group(1), '%m/%d/%Y')
            category = result.group(2)
            name = result.group(3)
            address = result.group(4)
            description = result.group(5)
            amount = float(result.group(6).replace(',', '').strip())
            tax_type = result.group(7)
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
                                        description=description,
                                        batch=new_batch_record)

            new_expense_entry.save()

    return new_batch_record





