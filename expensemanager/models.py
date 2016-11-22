from django.db import models


class Employee(models.Model):
    """ Employee's basic informtion """
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)


class Category(models.Model):
    name = models.CharField(max_length=50)


class Expense(models.Model):
    """ Expense details """
    date = models.DateTimeField()
    employee = models.ForeignKey(Employee, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.CharField(max_length=500)
    pretax_amount = models.DecimalField(max_digits=7, decimal_places=2)
    tax_name = models.CharField(max_length=100)
    tax_amount = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
