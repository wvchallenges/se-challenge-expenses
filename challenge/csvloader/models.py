import dateutil.parser
from datetime import datetime
from decimal import Decimal, InvalidOperation

from django.conf import settings
from django.db import models
from django.db.models import Sum


class Import(models.Model):
    """
    Keep track of what was imported, by whom, and when.
    """
    date = models.DateTimeField(default=datetime.now)
    imported_by = models.ForeignKey(settings.AUTH_USER_MODEL)
    raw_data = models.TextField()

    # Memoize this to avoid requerying a bunch when manging expenses.
    _expenses = False
    def expenses(self):
        if not self._expenses:
            self._expenses = self.expense_set.all()
        return self._expenses

    def total_pre_tax(self):
        return self.expense_set.aggregate(
            Sum('pre_tax_amount')
        ).get('pre_tax_amount__sum')

    def total_tax(self):
        return self.expense_set.aggregate(
            Sum('tax_amount')
        ).get('tax_amount__sum')



class Expense(models.Model):
    """
    Extremely direct modeling of the source CSV data.
    """
    date = models.DateField()
    category = models.CharField(max_length=200)
    employee_name = models.CharField(max_length=200)
    employee_address = models.TextField()
    expense_description = models.CharField(max_length=200)
    pre_tax_amount = models.DecimalField(max_digits=20, decimal_places=2)
    tax_name = models.CharField(max_length=50)
    tax_amount = models.DecimalField(max_digits=20, decimal_places=2)

    imported = models.ForeignKey(Import, null=True)

    # A collection of lambda functions for tidying various data values
    # Start off with precisely the values in the provided CSV.
    tidy_dates = lambda d: dateutil.parser.parse(d)
    noop = lambda x: x or 'not provided'
    tidy_decimal = lambda amt: Decimal(amt.strip().replace(',', ''))

    # nth column in the row => (name of model field, data cleaning lambda)
    column_spec = [
        ('date', tidy_dates),
        ('category', noop),
        ('employee_name', noop),
        ('employee_address', noop),
        ('expense_description', noop),
        ('pre_tax_amount', tidy_decimal),
        ('tax_name', noop),
        ('tax_amount', tidy_decimal)
    ]

    @staticmethod
    def check_row(row):
        for i, spec in enumerate(Expense.column_spec):
            try:
                spec[1](row[i])
            except InvalidOperation:
                return False
            except ValueError:
                return False
        return True

    @staticmethod
    def import_row(imported, row):
        args = {
            'imported_id': imported.id
        }
        for i, spec in enumerate(Expense.column_spec):
            args[spec[0]] = spec[1](row[i])

        expense = Expense(**args)
        expense.save()
        return expense


    class Meta:
        ordering=['date']

    @property
    def total_amount(self):
        return self.pre_tax_amount + self.tax_amount

    @property
    def year(self):
        return self.date.year

    @property
    def month_name(self):
        return self.date.strftime("%B")
