from decimal import Decimal
import csv
import datetime
from csv_upload.models import Expense
import logging
logger = logging.getLogger(__name__)

def csv_2_sql(f):
    for row in csv.reader(f.read().splitlines()):
        if row[0] != 'date': # skip the header row
            #logger.debug(row)
            Expense.objects.get_or_create(
                # date format convertor, interesingly I do not find where to change the model's default format
                spend_date = datetime.datetime.strptime(row[0], "%m/%d/%Y").strftime("%Y-%m-%d"),
                category = row[1],
                employee_name = row[2],
                employee_address = row[3],
                expense_description = row[4],
                # Decimal does not deal with ','...
                pretax_amount = Decimal(row[5].translate(None, ',')),
                tax_name = row[6],
                tax_amount = Decimal(row[7].translate(None, ','))
            )
                
