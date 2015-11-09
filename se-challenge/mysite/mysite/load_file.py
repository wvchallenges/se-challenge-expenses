csv_filepathname = "C:/Users/Chris/Documents/GitHub/se-challenge/se-challenge/mysite/mysite/data_example.csv"
djangoProject_home="C:/Users/Chris/Documents/GitHub/se-challenge/se-challenge/mysite"

import sys, os
sys.path.append(djangoProject_home)
os.environ['DJANGO_SETTINGS_MODULE']='settings'

from ExpenseCalculator.models import RawExpenseSheet
from django.core.exceptions import ValidationError
import csv
from datetime import datetime

from decimal import Decimal
dataReader = csv.reader(open(csv_filepathname), delimiter=',', quotechar='"')

headerLine = True
for row in dataReader:
	if headerLine:
		headerLine = False
		continue
	if row[0] != '': # Ignore the header row, import everything else
		rawExpenseSheet = RawExpenseSheet()
		rawExpenseSheet.date =  datetime.strptime(row[0], '%m/%d/%Y')
		rawExpenseSheet.category = row[1]
		rawExpenseSheet.employee_name = row[2]
		rawExpenseSheet.employee_address = row[3]
		rawExpenseSheet.expense_description = row[4]
		print(row[5])
		rawExpenseSheet.pre_tax = Decimal(row[5].replace(',', ''))
		rawExpenseSheet.tax_name = row[6]
		rawExpenseSheet.tax_amount = Decimal(row[7])
		rawExpenseSheet.post_tax = rawExpenseSheet.pre_tax - rawExpenseSheet.tax_amount
		print("SAVED")
		rawExpenseSheet.save()