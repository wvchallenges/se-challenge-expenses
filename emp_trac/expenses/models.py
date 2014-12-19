
from django.utils.translation import ugettext_lazy as _
from django.db import models


class Expense(models.Model):

    employee = models.ForeignKey('employees.Employee')
    date = models.DateTimeField()
    description = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # May need to be increased
    tax_rate = models.DecimalField(max_digits=6, decimal_places=5)
    tax_name = models.CharField(max_length=255, blank=True, null=True)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, blank=True, null=True)

    def formatted_amount(self):
        return "{:.2f}%".format(self.amount)

    def formatted_tax(self):
        return "{:.2f}%".format(self.tax_amount)

    def __unicode__(self):
        return self.description