import csv
import collections
import os

from .models import Document, DocumentEntry, MonthlyExpenditure
from .utils import SanitizeInput, CurrencyHelper


def write_csv_file(path, csv_file):
    fout = open(path, 'wb')
    for chunk in csv_file.chunks():
        fout.write(chunk)
    fout.close()


def save_file_content_to_database(csv_file):
    path = os.getcwd() + r'/media/' + csv_file.name
    print(path)
    write_csv_file(path, csv_file)

    newdoc = Document(docfile=path, name=csv_file.name)
    newdoc.save()

    sanitize = SanitizeInput()

    reader = csv.DictReader(open(path))
    for row in reader:
        date = sanitize.sanitize_date_format(row['date'])
        category = row['category']
        employee_name = row['employee name']
        employee_address = row['employee address']
        expense_description = row['expense description']
        pre_tax_amount = sanitize.sanitize_float_format(row['pre-tax amount'])
        tax_name = row['tax name']
        tax_amount = sanitize.sanitize_float_format(row['tax amount'])

        entry = DocumentEntry(
            document=newdoc, date=date,
            category=category, employee_name=employee_name,
            employee_address=employee_address,
            expense_description=expense_description,
            pre_tax_amount=pre_tax_amount, tax_name=tax_name,
            tax_amount=tax_amount
        )
        entry.save()

    monthly_expenses = calculate_total_expenses_per_month(newdoc.id)
    save_total_monthly_expenses_to_database(monthly_expenses, newdoc)


def calculate_total_expenses_per_month(document_id):
    """
    For a given document, we process each row and sum the
    tax amount and pre-tax amount to obtain a total amount per row.
    The object returned is a dict where the first entry is the year
    and month, and the second is the relative total amount.
    """

    currency_helper = CurrencyHelper()
    year_month_dict = {}
    for instance in DocumentEntry.objects.all().filter(document=document_id):
        year_month = str(instance.date.year) +\
            "-" + str('%02d' % instance.date.month)

        if year_month not in year_month_dict:
            year_month_dict[year_month] = \
                instance.tax_amount + instance.pre_tax_amount

        else:
            year_month_dict[year_month] += \
                instance.tax_amount + instance.pre_tax_amount

    # The costs are stored in terms of cents instead of
    # dollars to eliminate floating point accuracy issues.
    # We then need to convert back to dollars.
    year_month_dict = {
        k: currency_helper.cents_to_dollars(v)
        for k, v in year_month_dict.items()
    }

    # Order in reverse chronological order
    year_month_dict = collections.OrderedDict(sorted(year_month_dict.items()))

    return year_month_dict


def save_total_monthly_expenses_to_database(monthly_expenses, document_object):
    """
    Given a specific uploaded document, calculates and stores the expenses
    for each month.
    """

    for key, value in monthly_expenses.items():

        year_month_split = key.split("-")
        year = year_month_split[0]
        month = year_month_split[1]

        expense = MonthlyExpenditure(
            document=document_object,
            month=month, year=year,
            monthly_expenditure=value
        )
        expense.save()
