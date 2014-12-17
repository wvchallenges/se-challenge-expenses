from django.db import models
from django.utils.translation import ugettext_lazy as _

import decimal


#TODO: move these to the model

# Tax Choices
TAX_RATE_NONE = 0
TAX_RATE_CA = 0.07500
TAX_RATE_NY = 0.08750

TAX_RATES = (
    (TAX_RATE_NONE, _('Not Taxable')),
    (TAX_RATE_NY, _('NY Sales tax')),
    (TAX_RATE_CA, _('CA Sales tax')),
)

# Categories
CATEGORY_TRAVEL = 'Travel'
CATEGORY_COMP_HARDWARE = 'Computer - Hardware'
CATEGORY_COMP_SOFTWARE = 'Computer - Software'
CATEGORY_MEALS_ENTERTAINMENT = 'Meals and Entertainment'
CATEGORY_OFFICE_SUPPLIES = 'Office Supplies'
CATEGORY_OTHER = 'Other'

CATEGORIES = (
    (CATEGORY_TRAVEL, _('Travel')),
    (CATEGORY_COMP_HARDWARE, _('Computer - Hardware')),
    (CATEGORY_COMP_SOFTWARE, _('Computer - Software')),
    (CATEGORY_MEALS_ENTERTAINMENT, _('Meals and Entertainment')),
    (CATEGORY_OFFICE_SUPPLIES, _('Office Supplies')),
    (CATEGORY_OTHER, _('Other')),
)


def taxes_dict():
    return dict((y, x) for x, y in TAX_RATES)


def categories_dict():
    return dict((x, y) for x, y in CATEGORIES)


class Expense(models.Model):

    employee = models.ForeignKey('employees.Employee')
    date = models.DateTimeField()
    description = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # May need to be increased
    # TODO: change to tax_state, and tax_percent
    tax = models.DecimalField(_('Tax Name'), max_digits=6, decimal_places=5, default=TAX_RATE_NONE, choices=TAX_RATES)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, blank=True, null=True, choices=CATEGORIES, default=CATEGORY_OTHER)

    def formatted_amount(self):
        return '$%.2f' % self.amount

    def formatted_tax(self):
        return "{:.2f}%".format(self.tax)

    @property
    def tax_amount(self):
        return '$%.2f' % float(self.amount * self.tax)


    @property
    def total_amount(self):
        return '$%.2f' % float(self.amount * (1+self.tax))

    def __unicode__(self):
        #return "{},{},{},{}".format(self.date, self.employee, self.category, self.tax_amount)
        return self.description