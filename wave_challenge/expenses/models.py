from django.db import models


class ExpenseCategory(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Employee(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)

    def __unicode__(self):
        return self.name


class TaxType(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class Expense(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    expense_date = models.DateField(db_index=True)
    category = models.ForeignKey(ExpenseCategory)
    employee = models.ForeignKey(Employee)
    description = models.TextField()
    pretax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.ForeignKey(TaxType)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
