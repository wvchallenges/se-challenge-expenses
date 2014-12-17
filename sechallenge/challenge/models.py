from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=512)


class Expense(models.Model):
    employee = models.ForeignKey(Employee)
    date = models.DateField()
    category = models.CharField(max_length=512)
    description = models.TextField()
    pre_tax = models.FloatField()
    tax_type = models.CharField(max_length=512)
    tax_amount = models.FloatField()
