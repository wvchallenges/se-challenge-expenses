from django.core.exceptions import ObjectDoesNotExist
from django.core.files import File
from django.utils import timezone
from datetime import datetime
from decimal import Decimal
import csv
import os

from consume.models import Expense, Employee, Category, Tax, CSVFile


DELIMITER = ','

FIELD_HEADER = [
    'date',
    'category',
    'employee_name',
    'employee_address',
    'expense_description',
    'pre-tax amount',
    'tax_name',
    'tax_amount'
]


def import_csv_file(filename):
    '''
    Imports a list of new expenses from a CSV filename.

    Creates a new Expense, Employee, Category for each new entry.

    Expenses are organized by date and have foriegn
    relationship to one Employee, one Category and one Tax Type

    Expense digits are cleaned and stripped of commas and stored in decimal
    format to allow for no double precision errors when adding.
    Another way we could solve for money precision issues is by converting
    our raw dollar values into an Integer of pennies.

    Parameters:
    * filename: string

    Returns:
    * integer, the number of expense records that were imported
    '''
    created = 0
    now = timezone.now()

    # Save source file
    f = open(filename)
    csvFile = File(f)
    fcsv = CSVFile(
        filename=os.path.basename(f.name),
        upload_date=now,
        csv_file=csvFile
    )
    fcsv.save()

    # Open source file (line-by-line)
    with open(filename, 'rU') as incsv:
        print(incsv.name)
        reader = csv.reader(incsv, delimiter=DELIMITER)
        reader.next()
        for row in reader:
            date, category_name, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount = row

            # Get or create employee
            try:
                employee = Employee.objects.get(
                    name=employee_name,
                    address=employee_address
                )
            except ObjectDoesNotExist:
                employee = Employee(
                    name=employee_name,
                    address=employee_address
                )
                employee.save()
                print('created new Employee: {}'.format(employee))

            # Get or create category
            try:
                category = Category.objects.get(
                    name=category_name
                )
            except ObjectDoesNotExist:
                category = Category(
                    name=category_name,
                )
                category.save()
                print('created new Category: {}'.format(category))

            # Get or create tax type
            try:
                tax = Tax.objects.get(
                    name=tax_name
                )
            except ObjectDoesNotExist:
                tax = Tax(
                    name=tax_name,
                )
                tax.save()
                print('created new Tax Type: {}'.format(tax))

            # TODO: *Refactor* Write clean function to convert string to
            # ...Decimal and possibly penny converter to prevent precision
            # ...errors when adding? Need to research a bit more
            expense = Expense(
                date=datetime.strptime(date, "%m/%d/%Y"),
                source_file=fcsv,
                category=category,
                employee=employee,
                description=expense_description,
                pre_tax_amount=Decimal(pre_tax_amount.replace(',', '')),
                tax=tax,
                tax_amount=Decimal(tax_amount.replace(',', '')),
                deleted=False
            )
            expense.save()
            print('created Expense report: {}'.format(expense.id))
            created += 1
    return created
