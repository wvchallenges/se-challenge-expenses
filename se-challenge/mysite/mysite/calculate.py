djangoProject_home="C:/Users/Chris/Documents/GitHub/se-challenge/se-challenge/mysite"

import sys, os
sys.path.append(djangoProject_home)
os.environ['DJANGO_SETTINGS_MODULE']='settings'

from ExpenseCalculator.models import RawExpenseSheet, MonthlyExpense
from decimal import Decimal
from datetime import date

for expense in RawExpenseSheet.objects.all():
	lookupdate = date(expense.date.year, expense.date.month, 1)
	lookupname = expense.employee_name
	monthlyExpenseFiltered = MonthlyExpense.objects.filter(date=lookupdate, employee_name = lookupname)
	print(monthlyExpenseFiltered)
	
	#add new monthlyExpense for employee if record not found
	if not monthlyExpenseFiltered:
		print("montlyExpense not found")
		newMonthlyExpense = MonthlyExpense()
		newMonthlyExpense.date = lookupdate
		newMonthlyExpense.employee_name = lookupname
		newMonthlyExpense.pre_tax = expense.pre_tax
		newMonthlyExpense.tax_amount = expense.tax_amount
		newMonthlyExpense.post_tax = expense.post_tax
		newMonthlyExpense.save()
	else: #update employee's monthly expense if found
		monthlyExpenseRecord = MonthlyExpense.objects.get(date=lookupdate, employee_name = lookupname)
		print(expense.pre_tax,expense.tax_amount,expense.post_tax)
		monthlyExpenseRecord.pre_tax+=expense.pre_tax
		monthlyExpenseRecord.tax_amount += expense.tax_amount
		monthlyExpenseRecord.post_tax += expense.post_tax
		monthlyExpenseRecord.save()