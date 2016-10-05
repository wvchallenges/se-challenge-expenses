from django.db import models

class Employee(models.Model):
	name = models.CharField(max_length=100)
	address = models.CharField(max_length=200)

class Expenses(models.Model):
	date = models.DateTimeField()
	category = models.CharField(max_length=100)
	description = models.CharField(max_length=200)
	pre_tax_amount = models.DecimalField()
	tax_name = models.CharField(max_length=100)
	tax_amount = models.DecimalField()

# Create your models here.
