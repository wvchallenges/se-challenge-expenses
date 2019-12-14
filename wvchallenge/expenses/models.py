from __future__ import unicode_literals

from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=128)
    addr = models.CharField(max_length=255)


class Expenses(models.Model):
    date = models.DateField()
    category = models.CharField(max_length=128)
    employee = models.ForeignKey(Employee)
    desc = models.CharField(max_length=255)
    pre_tax_amt = models.DecimalField(max_digits=16, decimal_places=2)
    tax_type = models.CharField(max_length=255)
    tax_amt = models.DecimalField(max_digits=16, decimal_places=2)
