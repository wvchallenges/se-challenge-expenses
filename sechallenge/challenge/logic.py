import csv
from io import StringIO
from django.utils.dateparse import parse_date
from datetime import datetime

from .models import Employee, Expense


def parse_fd(fd):
    """Open file upload FD and parse CSV  data in it"""
    str_fd = StringIO(fd.read().decode(encoding='UTF-8'))
    csv_reader = csv.reader(str_fd)
    for row in csv_reader:
        yield row


def update_db(data):
    Expense.objects.filter(recent_data=True).update(recent_data=False)
    for row in [[y.strip() for y in x] for x in data]:
        process_record(row)


def process_record(row):
    def employee_info(row):
        return {'name': row[2], 'address': row[3]}

    def expense_info(row):
        def clean_floats(in_str):
            return "".join([
                x for x in in_str
                if x.isdigit() or x == '.'
            ])

        def parse_datetime(item):
            try:
                out = parse_date(item)
                if not out:
                    raise ValueError()
                return out
            except ValueError:
                pass

            try:
                return datetime.strptime(item, '%d/%m/%Y').date()
            except ValueError:
                pass

            return datetime.strptime(item, '%m/%d/%Y').date()

        return {
            'date': parse_datetime(row[0]),
            'category': row[1],
            'description': row[4],
            'pre_tax': float(clean_floats(row[5])),
            'tax_type': row[6],
            'tax_amount': float(clean_floats(row[7]))
        }

    def employee_found(emp):
        try:
            emp = Employee.objects.filter(**emp)
            return emp.objects[0]
        except AttributeError:
            return False

    def expense_add(exp):
        exp = Expense(**exp)
        exp.save()

    employee = employee_info(row)
    expense = expense_info(row)
    emp = employee_found(employee)
    if not emp:
        emp = Employee(**employee)
        emp.save()

    expense['employee'] = emp
    expense_add(expense)
