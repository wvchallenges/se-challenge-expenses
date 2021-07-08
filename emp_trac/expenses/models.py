from django.db import models


class Expense(models.Model):

    employee = models.ForeignKey('employees.Employee')
    date = models.DateTimeField()
    description = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    tax_rate = models.DecimalField(max_digits=6, decimal_places=5, blank=True, null=True)
    tax_name = models.CharField(max_length=255, blank=True, null=True)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)

    def formatted_amount(self):
        return "{:.2f}%".format(self.amount)

    def formatted_tax(self):
        return "{:.2f}%".format(self.tax_amount)

    def __unicode__(self):
        return self.description