import csv
from datetime import datetime, date
from decimal import Decimal

from models import Employee, ExpenseUpload, Expense

EXPECTED_FIELDS = [
    'date', 'category', 'employee name', 'employee address',
    'expense description', 'pre-tax amount', 'tax name', 'tax amount']
DATE_FORMAT = '%m/%d/%Y'


def handle_uploaded_file(f):
    '''
    Read an uploaded CSV file and extract the information we need from it

    Returns a list of date, amount tuples of the sums of expenses per month
    '''

    reader = csv.DictReader(f)

    # Pull the first row, which is our CSV headers
    # This allows us to use reader.fieldnames which is only populated after
    # the first line of the CSV is read
    reader.next()
    fields = reader.fieldnames

    # Make sure we got the fields we're expecting
    if fields != EXPECTED_FIELDS:
        raise ValueError('Incorrect fields!')

    # Log the upload
    upload = ExpenseUpload.objects.create(
        filename=f.name,
        uploaded=datetime.now())

    # A mapping of months to sums
    month_sums = {}

    for row in reader:
        # Find the employee based on their name and address,
        # or create a new entry
        employee, created = Employee.objects.get_or_create(
            name=row['employee name'],
            address=row['employee address'])

        # Parse the expense date
        expense_date = datetime.strptime(row['date'], DATE_FORMAT)
        # We use the first day of the month as the key for our mapping
        month = date(expense_date.year, expense_date.month, 1)

        pre_tax_amt = Decimal(row['pre-tax amount'].strip().replace(',', ''))
        tax_amt = Decimal(row['tax amount'].strip().replace(',', ''))
        total_amt = pre_tax_amt + tax_amt

        # Add the total for this expense to the rest in this month
        # or to 0 if there are no expenses in this month yet
        month_sums[month] = month_sums.get(month, 0) + total_amt

        Expense.objects.create(
            upload=upload,
            date=expense_date,
            category=row['category'],
            employee=employee,
            description=row['expense description'],
            pre_tax_amt=pre_tax_amt,
            tax_name=row['tax name'],
            tax_amount=tax_amt)

    # Rerturn the month sums sorted by month
    return sorted(month_sums.iteritems(), key=lambda sum: sum[0])
