from django.db import models

# Create your models here.

class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)

class Category(models.Model):
    name = models.CharField(max_length=30)

class Expense(models.Model):
    description = models.CharField(max_length=50)
    date = models.DateField()
    pretax = models.DecimalField(max_digits=6, decimal_places=2)
    tax = models.DecimalField(max_digits=6, decimal_places=2)
    taxname = models.CharField(max_length=50)
    employee = models.ForeignKey(Employee)
    category = models.ForeignKey(Category)