# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Create your models here.

class Expense(models.Model):
    date = models.DateField('date', blank = False, null=False)
    category = models.CharField('category', default='', max_length= 100)
    employee_name = models.CharField('employ name', max_length=100)
    employee_address = models.TextField('address', default='')
    expense_description = models.TextField('expense notes', default='')
    pre_tax_amount = models.DecimalField('pre-tax amount',max_digits=10, decimal_places=2, null=True, blank=True)
    tax_amount = models.DecimalField('tax amount',max_digits=10, decimal_places=2, null=True, blank=True)
    tax_name = models.CharField('tax name', max_length=100)
    file_tag = models.CharField('file_tag', default='', max_length= 100) #csv file tags

    def __str__(self):
        return self.name


