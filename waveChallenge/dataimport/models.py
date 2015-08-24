from django.db import models


# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)


class Category(models.Model):
    name = models.CharField(max_length=100)


class TaxType(models.Model):
    name = models.CharField(max_length=100)


class Expense(models.Model):
    owner = models.ForeignKey(Employee)
    category = models.ForeignKey(Category)
    amount = models.FloatField(default=0)
    tax_type = models.ForeignKey(TaxType)
    tax_amount = models.FloatField(default=0)
    date = models.DateTimeField()
    description = models.TextField()



