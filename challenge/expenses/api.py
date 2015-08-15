import csv
import datetime
from decimal import Decimal

from challenge.expenses.models import Report, Category, Tax, Employee, Expense


# Indexes
DATE = 0
CATEGORY = 1
EMPLOYEE_NAME = 2
EMPLOYEE_ADDRESS = 3
EXPENSE_DESCRIPTION = 4
PRE_TAX_AMOUNT = 5
TAX_NAME = 6
TAX_AMOUNT = 7


def _parse_decimal(value):
    return Decimal(value.replace(',', ''))


def process_report(report_id):
    report = Report.objects.get(id=report_id)

    # That context keeps the file open and prevents
    # loading the whole contents of the file in memory
    # The file will be close automatically
    with open(report.file.path, 'r') as fd:
        # Detect csv dialect (delimiter, quote, etc)
        dialect = csv.Sniffer().sniff(fd.read(1024))
        # Go back to beginning of file & start parsing
        fd.seek(0)
        reader = csv.reader(fd, dialect)
        # First line is headers, skip it
        reader.next()

        for row in reader:
            row = map(str.strip, row)
            # Parse date
            date = datetime.datetime.strptime(row[DATE], '%m/%d/%Y')

            # Get category
            category, _ = Category.objects.get_or_create(name=row[CATEGORY])

            # Get employee
            employee, _ = Employee.objects.get_or_create(
                name=row[EMPLOYEE_NAME], address=row[EMPLOYEE_ADDRESS]
            )

            # Get tax
            tax, _ = Tax.objects.get_or_create(name=row[TAX_NAME])

            # Record the expense
            Expense.objects.create(
                report=report,
                date=date,
                employee=employee,
                description=row[EXPENSE_DESCRIPTION],
                tax=tax,
                pre_tax_amount=_parse_decimal(row[PRE_TAX_AMOUNT]),
                tax_amount=_parse_decimal(row[TAX_AMOUNT])
            )
