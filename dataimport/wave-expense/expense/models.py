from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models import F
from django.db.models import FloatField
from django.db.models import Sum
from django.db import connection

import csv

class Category(models.Model):
	category = models.CharField(max_length=50)

	def __unicode__(self):
		return self.category

	@staticmethod
	def add(categ):
		c = Category()
		try:
			c = Category.objects.get(category=categ)
		except ObjectDoesNotExist:
			c = Category(category=categ)
			c.save()
		return c


class Employee(models.Model):
	name = models.CharField(max_length=200)
	address = models.CharField(max_length=300)

	def __unicode__(self):
		return self.name

	@staticmethod
	def add(employee_name, employee_address):
		e = Employee()
		try:
			e = Employee.objects.get(name=employee_name, address=employee_address)
		except ObjectDoesNotExist:
			e = Employee(name=employee_name, address=employee_address)
			e.save()
		return e


class Expense(models.Model):
	date = models.DateField()
	category = models.ForeignKey(Category)
	employee = models.ForeignKey(Employee)
	description = models.CharField(max_length=250)
	pre_tax = models.DecimalField(max_digits=19, decimal_places=2)
	tax_name = models.CharField(max_length=50)
	tax_amount = models.DecimalField(max_digits=19, decimal_places=2)

	def __unicode__(self):
		return self.description

	@staticmethod
	def month_report():
		truncate_date = connection.ops.date_trunc_sql('month', 'date')
		qs = Expense.objects.extra( {'month':truncate_date} )
		report = qs.values('month').annotate( total=Sum(F('pre_tax') + F('tax_amount'), output_field=FloatField()) ).order_by('month')
		return report

	@staticmethod
	def loadfile(f):
		reader = csv.DictReader(f);
		for row in reader:
			exp = Expense()
			dt = row['date'].split('/')
			exp.date = dt[2] + '-' + dt[0] + '-' + dt[1]
			exp.category = Category.add(row['category'])
			exp.employee = Employee.add(row['employee name'], row['employee address'])
			exp.description = row['expense description']
			exp.pre_tax = float(row['pre-tax amount'].replace(',',''))
			exp.tax_name = row['tax name']
			exp.tax_amount = float(row['tax amount'].replace(',',''))
			exp.save()
