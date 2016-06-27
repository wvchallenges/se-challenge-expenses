from __future__ import unicode_literals

from django.db import models

class Employee(models.Model):
  name = models.CharField(max_length=32)
  address = models.CharField(max_length=128)

  def __str__(self):
    return u'%s' % (self.name)

  class Meta:
    ordering = ['name']

class Expense(models.Model):
  date = models.DateField()
  category = models.CharField(max_length=64)
  description = models.CharField(max_length=128)
  pre_tax_amount = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Pre-Tax Amount")
  tax_name = models.CharField(max_length=32)
  tax_amount = models.DecimalField(max_digits=8, decimal_places=2)
  employee = models.ForeignKey(Employee)

  def __str__(self):
    return u'%s' % (self.description)

  class Meta:
    ordering = ['date']
