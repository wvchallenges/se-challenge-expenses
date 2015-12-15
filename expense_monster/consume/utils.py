from consume.models import Expense, Employee, Category, Tax

from django.utils import timezone
import csv


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
    relationship to one Employee and one Category

    Parameters:
    * filename: string

    Returns:
    * integer, the number of expense records that were imported
    '''
    created = 0
    now = timezone.now()
    with open(filename, 'rU') as incsv:
        reader = csv.reader(incsv, delimiter=DELIMITER)
        reader.net()
        for row in reader:
            date, category_name, employee_name, employee_address, expense_description, pre_tax_amount, tax_name, tax_amount = row

            # Get or create employee
            try:
                employee = Employee.object.get(
                    name=employee_name,
                    address=employee_address
                )
            except:
                employee = Employee(
                    name=employee_name,
                    address=employee_address
                )
                employee.save()
                print('created new Employee: {}'.format(employee))

            # Get or create category
            try:
                category = Category.object.get(
                    name=category_name
                )
            except:
                category = Employee(
                    name=category_name,
                )
                category.save()
                print('created new Category: {}'.format(category))

            # Get or create tax
            try:
                tax = Tax.object.get(
                    name=tax_name
                )
            except:
                tax = Tax(
                    name=tax_name,
                )
                tax.save()
                print('created new Tax Type: {}'.format(tax))

            expense = Expense(
                date=date,
                upload_date=now,
                category=category,
                employee=employee,
                description=expense_description,
                pre_tax_amount=pre_tax_amount,
                tax_name=tax,
                tax_amount=tax_amount,
                deleted=False
            )
            expense.save()
            print('created Expense report: {}'.format(expense.id))
            created += 1
    return created
