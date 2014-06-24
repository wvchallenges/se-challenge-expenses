from django.db import models


class SubsidiaryData(models.Model):
    """
    Model for a row in database for company data, containing date, category, employee name, employee address,
    expense description, pre-tax amount, tax name, and tax amount fields.
    """
    date = models.DateField()
    category = models.CharField(max_length=256)
    employee_name = models.CharField(max_length=256)
    employee_address = models.CharField(max_length=256)
    expense_description = models.CharField(max_length=256)
    pre_tax_amount = models.DecimalField(max_digits=8, decimal_places=2)
    tax_name = models.CharField(max_length=256)
    tax_amount = models.DecimalField(max_digits=8, decimal_places=2)