from wave.myapp.models import Document
from wave.myapp.models import Expense
from datetime import datetime
import csv
import pytz


def handle_uploaded_file(request):
    newdoc = Document(
        docfile=request.FILES['docfile'],
        created_time = datetime.now(pytz.utc)
        )
    newdoc.save()

    reader = csv.DictReader(request.FILES['docfile'])
    for row in reader:
        save_to_db(row, newdoc)

def save_to_db(row, doc):
    csv_to_db = Expense(
                date = datetime.strptime(row['date'],'%m/%d/%Y' ),
                category = row['category'],
                employee_name  = row['employee name'],
                employee_address = row['employee address'],
                expense_desc = row['expense description'], 
                pretax_amt = amount_formatter(row['pre-tax amount']),
                tax_name = row['tax name'], 
                tax_amount = amount_formatter(row['tax amount']),
                document = doc
                )
    csv_to_db.save()

def amount_formatter(amt):
    return float(amt.replace(',', ''))