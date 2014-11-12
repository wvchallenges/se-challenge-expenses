from datetime import datetime
import locale
import os
from uuid import uuid4
from decimal import Decimal
from django.http import HttpResponseRedirect, JsonResponse
from django.db import connection, transaction
import csv
from django.views.decorators.csrf import csrf_exempt
from django.core.files import temp
import time

from .models import Expense, Employee

locale.setlocale( locale.LC_ALL, 'en_US.UTF-8' )


def index(request):
    # embedded db access for simplicity
    with connection.cursor() as c:
        c.execute("""SELECT SUM(PreTaxAmount-TaxAmount) as TotalExpenses,
                strftime("%m-%Y", Date) as YearMonth
                FROM Expenses
                GROUP BY strftime("%m-%Y", Date)""")
        rows = c.fetchall()

    return JsonResponse([{'TotalExpenses': row[0], 'YearMonth': row[1] } for row in rows], safe=False)

@csrf_exempt
def upload(request):
    if request.method == 'POST':
        # file is saved
        csv_file = handle_uploaded_file(request.FILES['inputFile'])
        process_csv(csv_file.name)
        os.remove(csv_file.name)

    return HttpResponseRedirect(request.META['HTTP_ORIGIN'])


def parse_decimal(decimal_str):
    return Decimal(locale.atof(decimal_str))


def process_csv(csv_path):
    with open(csv_path, 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            employee_name = row['employee name']
            employee = Employee.objects.filter(name=employee_name)

            with transaction.atomic():
                if(not employee):
                    employee = Employee()
                    employee.id = employee_id= uuid4().hex
                    employee.name = employee_name
                    employee.address = row['employee address']

                    employee.save()
                else:
                    employee_id = employee[0].id

                expense = Expense()
                expense.id = uuid4().hex
                expense.employee_id = employee_id
                # more reliable than datetime(*time_struct)
                expense.date = datetime.fromtimestamp(time.mktime(time.strptime(row["date"], '%m/%d/%Y')))
                expense.category = row["category"]
                expense.description = row["expense description"]
                expense.pre_tax_amount = parse_decimal(row["pre-tax amount"])
                expense.tax_name = row["tax name"]
                expense.tax_amount = parse_decimal(row["tax amount"])

                expense.save()



def handle_uploaded_file(inputFile):
    file = temp.NamedTemporaryFile(delete=False)
    with file as destination:
        for chunk in inputFile.chunks():
            destination.write(chunk)
    return file