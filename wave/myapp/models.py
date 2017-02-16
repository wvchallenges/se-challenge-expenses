# -*- coding: utf-8 -*-
from django.db import models

class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y-%m-%d')
    created_time = models.DateTimeField()

class Expense(models.Model):
	document = models.ForeignKey(
		Document, 
		on_delete=models.CASCADE,
		)
	date = models.DateField()
	category = models.CharField(max_length=100)
	employee_name  = models.CharField(max_length=100)
	employee_address = models.CharField(max_length=512)
	expense_desc = models.CharField(max_length=100) 
	pretax_amt = models.DecimalField(max_digits=6, decimal_places=2)
	tax_name = models.CharField(max_length=100) 
	tax_amount = models.DecimalField(max_digits=6, decimal_places=2) 