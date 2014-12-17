from django.db import models
from uuidfield import UUIDField


class Employee(models.Model):
    uuid = UUIDField(auto=True)
    name = models.CharField(255)
    address = models.CharField(512)


class Expense(models.Model):
    employee = models.ForeignKey(Employee)
    date = models.DateField()
    category = models.CharField(512)
    description = models.TextField()
    pre_tax = models.DecimalField()
    tax_type = models.CharField(512)
    tax_amount = models.DecimalField()
