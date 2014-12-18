import csv
from io import StringIO
from django.utils.dateparse import parse_date
from datetime import datetime, date
import calendar
from dateutil import rrule

from .models import Employee, Expense


def parse_fd(fd):
    """Open file upload FD and parse CSV  data in it"""
    str_fd = StringIO(fd.read().decode(encoding='UTF-8'))
    csv_reader = csv.reader(str_fd)
    for row in csv_reader:
        yield row


def update_db(data):
    """
    Update database with incoming data
    """
    Expense.objects.filter(recent_data=True).update(recent_data=False)
    for row in [[y.strip() for y in x] for x in data]:
        process_record(row)


def process_record(row):
    """
    Process each CSV record
    """
    def employee_info(row):
        return {'name': row[2], 'address': row[3]}

    def expense_info(row):
        def clean_floats(in_str):
            return "".join([
                x for x in in_str
                if x.isdigit() or x == '.'
            ])

        def parse_datetime(item):
            """
            Some ambiguity on how to treat date formats ensues
            Assuming US format M/D/Y
            """
            try:
                out = parse_date(item)
                if not out:
                    raise ValueError()
                return out
            except ValueError:
                pass

            try:
                return datetime.strptime(item, '%m/%d/%Y').date()
            except ValueError:
                pass

            return datetime.strptime(item, '%d/%m/%Y').date()

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
            return emp[0]
        except IndexError:
            return None

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


def produce_month_dates(mindate, maxdate):
    """
    Generating year-month intervals
    There should be a better way of doing it with Django ORM
    """

    def getmaxday(s_date):
        return date(
            s_date.year,
            s_date.month,
            calendar.monthrange(s_date.year, s_date.month)[1]
        )

    def mon_range(min_date, max_date):
        min_date = date(min_date.year, min_date.month, 1)
        for x in rrule.rrule(rrule.MONTHLY, dtstart=min_date, until=max_date):
            yield date(x.year, x.month, x.day)

    for start in mon_range(mindate, maxdate):
        yield (start, getmaxday(start))
