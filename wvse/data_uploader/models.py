from django.db import models


# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=60)
    address = models.CharField(max_length=120)

    class Meta:
        unique_together = ('name', 'address')


class ExpenseUpload(models.Model):
    filename = models.CharField(max_length=200)
    uploaded = models.DateTimeField()


class Expense(models.Model):
    upload = models.ForeignKey('ExpenseUpload')
    date = models.DateField()
    category = models.CharField(max_length=60)
    employee = models.ForeignKey('Employee')
    description = models.CharField(max_length=120)
    pre_tax_amt = models.DecimalField(max_digits=7, decimal_places=2)
    tax_name = models.CharField(max_length=12)
    tax_amount = models.DecimalField(max_digits=6, decimal_places=2)
