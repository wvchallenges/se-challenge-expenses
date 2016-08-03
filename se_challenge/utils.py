import csv
from datetime import datetime
from decimal import Decimal, InvalidOperation

from django.core.exceptions import ValidationError

from .models import Category, OfficeAddress, Employee, Expense
from .forms import ExpenseForm


def process_report(instance):
    """ Ideally this talk should be handled in asynchronous manner """

    # csv file format definitions and parsers
    columns = (('date', lambda x: datetime.strptime(x, "%d/%m/%Y").date()),
               ('category', lambda x: Category.objects.get_or_create(name=x)[0].pk),
               ('employee', lambda x: Employee.objects.get_or_create(full_name=x)[0].pk),
               ('employee_address', lambda x: OfficeAddress.objects.get_or_create(address=x)[0].pk),
               ('description', str),
               ('pre_tax', lambda x: Decimal(x.replace(',', ''))),
               ('tax_name', str),
               ('tax', lambda x: Decimal(x.replace(',', ''))))
    column_dict = dict(columns)
    field_names, field_format = zip(*columns)
    form_class = ExpenseForm

    def convert_or_string(parser, value):
        """ If parser fails to convert, silently proceed with string """
        try:
            return parser(value)
        except (TypeError, ValueError, InvalidOperation):
            return value

    def process_row(row):
        """ Process a single row and return parsed data as dictionary """
        d = {k: convert_or_string(column_dict[k], v) for k, v in row.items()}
        d['report'] = instance.pk
        return d

    # process file content
    with open(instance.report_file.path, 'r') as f:
        reader = csv.DictReader(f, fieldnames=field_names)
        next(reader, None)
        for row in map(process_row, reader):
            expense_form = form_class(data=row)
            if expense_form.is_valid():
                expense = expense_form.save(commit=True)
            else:
                print(expense_form.errors)
                raise ValidationError(expense_form.errors)
