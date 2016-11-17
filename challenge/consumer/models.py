from __future__ import unicode_literals

from django.db import models


class Employee(models.Model):
    """ An employee with the ability to claim expenses. """
    name = models.CharField("Full Name", max_length=255, blank=False, help_text="First and last name are expected.")
    address = models.TextField()


class ExpenseCategory(models.Model):
    """ Category tag for expense transactions. """
    name = models.CharField("Category Name", max_length=255, blank=False, help_text="A descriptive name to indicate the reason for an expense.")
    subcategory = models.CharField("Subcategory Name", max_length=255, blank=True, help_text="Allows for more specificity in the reason for an expense.")

    class Meta:
        unique_together = (('name', 'subcategory'))


class Expense(models.Model):
    """ A categorized employee expense to be tracked. """
    charged_on = models.DateField(help_text="The date on which the employee charged this expensive.")
    employee = models.ForeignKey(Employee, help_text="The employee reporting this expense.")
    category = models.ForeignKey(ExpenseCategory, help_text="The category this expense best belongs to.")
    description = models.CharField(max_length=511, blank=False, help_text="A brief description of the expense.")
    pretax_amount = models.DecimalField(max_digits=12, decimal_places=2, help_text="The dollar amount BEFORE taxes.")
