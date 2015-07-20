from django.db import models

class Record(models.Model):
	date                = models.DateTimeField('date')
	expense_category    = models.CharField(max_length=100)
	employee_name       = models.CharField(max_length=50)
	employee_address    = models.CharField(max_length=200)
	expense_description = models.CharField(max_length=200)
	sub_total           = models.DecimalField(max_digits=12, decimal_places=2)
	tax_name            = models.CharField(max_length=50)
	tax_amount          = models.DecimalField(max_digits=12, decimal_places=2)
