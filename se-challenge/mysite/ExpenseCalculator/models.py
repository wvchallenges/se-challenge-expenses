from django.db import models
from datetime import date 
# Create your models here.

class RawExpenseSheet(models.Model):
	date = models.DateField('Date')
	category = models.CharField(max_length=200)
	employee_name = models.CharField(max_length=200)
	employee_address = models.CharField(max_length=200)
	expense_description = models.CharField(max_length=200)
	pre_tax = models.DecimalField(max_digits=6, decimal_places=2)
	tax_name = models.CharField(max_length=200)
	tax_amount = models.DecimalField(max_digits=6, decimal_places=2)
	post_tax = models.DecimalField(max_digits=6, decimal_places=2)
	def __str__(self):
		return self.employee_name
	
class MonthlyExpense(models.Model):
	date = models.DateField('Date');
	#employee_name = models.CharField(max_length=200)
	pre_tax = models.DecimalField(max_digits=6, decimal_places=2)
	tax_amount = models.DecimalField(max_digits=6, decimal_places=2)
	post_tax = models.DecimalField(max_digits=6, decimal_places=2)
	def __str__(self):
		return self.date