from django.contrib.auth.models import User
from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)

    def __str__(self):
        return '{} - {}'.format(self.id, self.name)


class ExpenseReport(models.Model):
    date = models.DateField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    expense_description = models.TextField()
    pre_tax_amount = models.DecimalField(max_digits=19, decimal_places=10)
    tax_name = models.CharField(max_length=100)
    tax_amount = models.DecimalField(max_digits=19, decimal_places=10)
    employee = models.ForeignKey('Employee', on_delete=models.CASCADE)

    def __str__(self):
        return '{} - {}'.format(self.employee.name, self.date)


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return '{} - {}'.format(self.id, self.name)
