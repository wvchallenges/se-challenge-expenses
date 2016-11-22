from collections import defaultdict, OrderedDict
from datetime import datetime
from locale import atof

from se_challenge import PERMITTED_FILE_EXTENSION


def check_file_extension(filename):
    """Method checks for filename extension (must end with '.csv')."""
    return filename.lower().endswith(".{}".format(PERMITTED_FILE_EXTENSION))


def process_expenses(csv_frame):
    """Method processes a CSV data-frame to calculate expenses. Adds total amounts,
    and couples that total per date of expense."""
    total_tax = []
    columns = csv_frame.pretax_amount.values, csv_frame.tax_amount.values, csv_frame.date.values
    for pretax_amount, tax_amount, date in zip(*columns):
        pretax_amount_sanitized = atof(pretax_amount) if isinstance(pretax_amount, basestring) else pretax_amount
        tax_amount_sanitized = atof(tax_amount) if isinstance(tax_amount, basestring) else tax_amount
        total_amount = pretax_amount_sanitized + tax_amount_sanitized
        total_tax.append((date, total_amount))  # List of tuple pairs (date -> total expense).
    return sort_expenses(total_tax)


def sort_expenses(date_expense):
    """Sorts expenses according to date spent. This method also groups expense by Month/Year
    instead of the exact date in which the expenses are recorded."""
    expenses = defaultdict(int)  # Expenses dictionary -> date : expense.
    for entry in date_expense:
        unformatted_date = entry[0]
        expense = entry[1]
        date_obj = datetime.strptime(unformatted_date, '%m/%d/%Y')
        date = date_obj.strftime('%B/%Y')
        expenses[date] += expense
    sorted_expenses = OrderedDict(sorted(expenses.items(), key=lambda d: datetime.strptime(d[0], '%B/%Y')))
    return sorted_expenses