
from django.utils.translation import ugettext_lazy as _
from django.db import models


class TaxName(models.Model):

    # Tax Choices
    # TAX_RATE_NONE = 0
    # TAX_RATE_CA = 0.07500
    # TAX_RATE_NY = 0.08750

    # TAX_NAME = (
    #     ('N/A', _('Not Taxable')),
    #     ('NY', _('NY Sales tax')),
    #     ('CA', _('CA Sales tax')),
    # )

    rate = models.DecimalField(max_digits=6, decimal_places=5, blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)  # 'NY'

    def __unicode__(self):
        return self.region


class Expense(models.Model):
    TRAVEL = "TR"
    COMP_HARDWARE = "CH"
    COMP_SOFTWARE = "CS"
    MEALS_ENTERTAINMENT = "ME"
    OFFICE = "OS"
    OTHER_EXPENSE = "OR"
    CATEGORIES = (
        (TRAVEL, _('Travel')),
        (COMP_HARDWARE, _('Computer - Hardware')),
        (COMP_SOFTWARE, _('Computer - Software')),
        (MEALS_ENTERTAINMENT, _('Meals and Entertainment')),
        (OFFICE, _('Office Supplies')),
        (OTHER_EXPENSE, _('Other')),
    )

    employee = models.ForeignKey('employees.Employee')
    date = models.DateTimeField()
    description = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # May need to be increased
    tax_rate = models.DecimalField(max_digits=6, decimal_places=5)
    tax_name = models.ForeignKey(TaxName)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, blank=True, null=True, choices=CATEGORIES, default=OTHER_EXPENSE)

    def formatted_amount(self):
        return "{:.2f}%".format(self.amount)

    def formatted_tax(self):
        return "{:.2f}%".format(self.tax_amount)

    def __unicode__(self):
        return self.description