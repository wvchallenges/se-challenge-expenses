import csv
from models import Category, Employee, Expense
from time import strftime
from decimal import Decimal
from datetime import datetime
from .utils import generate_key, generate_sorted_list



def handle_csv_file(csvfile):
    """
    stores the file information in the database and returns the expenses amount per-month
    in a chronological order
    """

    reader = csv.DictReader(csvfile, delimiter=',')

    # A dictionnary where we are going to collect expenses per month
    expense_per_month = {}
    for row in reader:
        # Category check, get it or add it to the database
        cat = Category.objects.get_or_create(name=row['category'])[0]

        # Employee check, get it or add it to the database
        emp = Employee.objects.get_or_create(name=row['employee name'], address=row['employee address'])[0]

        # Extract date
        date = datetime.strptime(row['date'], '%m/%d/%Y')

        # Calculating total expense after tax
        pretax_amount = Decimal(row['pre-tax amount'].replace(',', ''))
        tax_amount = Decimal(row['tax amount'].replace(',', ''))
        after_tax = pretax_amount + tax_amount

        # We will collect the total expenses(after tax) represented by every row in the uploaded file
        # and group them by month in a dictionnary: the keys will be integers that will be generated
        # based on the expense date while the values will be tuples. These tuples will contain a string
        # that represents the month in letters and a decimal that represnts the total expense
        year = date.strftime("%Y")
        month = date.strftime("%m")
        # These keys are generated in a way that will help us later on reorganize the expenses per month
        # chronologically
        key = generate_key(year, month)
        try:
            # Key already exists, retrieving the total to update it
            previous_total = expense_per_month[key][1]
        except KeyError:
            # Key doesn't exist, no total to update
            previous_total = 0
        finally:
            # Generating first element of the tuple
            month_year = date.strftime("%B %Y")
            # Updating the dictionnary
            expense_per_month.update({key: (month_year, previous_total + after_tax)})

        # Creating a new expense and saving it to the database
        expense = Expense(
            date=date,
            employee=emp,
            description=row['expense description'],
            pretax_amount=pretax_amount,
            tax_name=row['tax name'],
            tax_amount=tax_amount,
            category=cat
        )
        expense.save()
    # Returning a sorted list of tuples
    return generate_sorted_list(expense_per_month)
