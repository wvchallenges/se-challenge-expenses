from __future__ import unicode_literals

from django.db import models

# Create your models here.

# date, category, employee name, employee address, expense description, pre-tax amount, tax name, and tax amount

class Expenses(models.Model):

    date = models.DateTimeField()
    category = models.CharField(max_length=100)
    employee_name = models.CharField(max_length=200)
    employee_address = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    pt_amount = models.FloatField()
    tax_name = models.CharField(max_length=100)
    tax_amount = models.FloatField()
