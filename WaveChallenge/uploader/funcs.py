from datetime import datetime
from calendar import monthrange
from dateutil.relativedelta import relativedelta
from .models import Record
import csv
import pytz


# cleans strings to save to db as numerics
def clean_numeric_value(str):
	removed_commas = str.replace(',','')
	removed_quotes = removed_commas.replace("'",'')
	return removed_quotes


# if upload file valid then map parsed data to model and save to db
def handle_uploaded_file(file_obj):
	for row in csv.reader(file_obj):
		if (row[0] != 'date'):
			r                     = Record()
			datetimeObj           = datetime.strptime(row[0], '%m/%d/%Y')
			r.date                = datetimeObj
			r.expense_category    = row[1]
			r.employee_name       = row[2]
			r.employee_address    = row[3]
			r.expense_description = row[4]
			r.sub_total           = clean_numeric_value(row[5])
			r.tax_name            = row[6]
			r.tax_amount          = clean_numeric_value(row[7])
			r.save()


# caculates monthly and total expenses of each months and returns var back for render
def get_monthly_expenses(min_date, max_date):
	context = {}
	one_month_delta = relativedelta(months=1)
	min_date = pytz.utc.localize(datetime(min_date.year, min_date.month, 1,))
	max_date = pytz.utc.localize(datetime(max_date.year, max_date.month + 1, 1))

	while(max_date > min_date):
		last_day_of_month = monthrange(min_date.year, min_date.month)
		final_date = datetime(min_date.year, min_date.month, last_day_of_month[1])
		final_date = pytz.utc.localize(final_date)

		expense = 0
		for recs in Record.objects.filter(date__range=[min_date, final_date]):
			expense += recs.sub_total + recs.tax_amount
		key = min_date.strftime("%B") + ' ' + str(min_date.year)
		context[key] = expense 
		min_date += one_month_delta
	for key, value in context.iteritems():
		print (key, value)
	return context