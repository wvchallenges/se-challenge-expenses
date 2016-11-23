from django.db import models
from django.db.models import Sum


class ExpenseItemManager(models.Manager):
    def month_sum(self, month):
        return self.filter(transaction_date__month=month.month,
                           transaction_date__year=month.year).order_by('transaction_date').aggregate(
            Sum('pre_tax_amount'),
            Sum('tax_amount'))


class TaxCategory(models.Model):
    tax_name = models.CharField(max_length=25, null=False, blank=False)

    def __unicode__(self):
        return u"%s" % self.tax_name


class ExpenseCategory(models.Model):
    expense_name = models.CharField(max_length=50, null=False, blank=False)

    def __unicode__(self):
        return u"%s" % self.expense_name


class Employee(models.Model):
    """
    Stores employee information.  Address is a CSV String received from the CSV files, un-parsed.
    """
    name = models.CharField(max_length=50, null=False, blank=False)

    def __unicode__(self):
        return u"%s" % self.name


class ExpenseAddress(models.Model):
    """ Stores employee / expense addresses """

    address = models.CharField(max_length=255, null=False, blank=False)

    def __unicode__(self):
        return u"%s" % self.address


class ExpenseItem(models.Model):
    transaction_date = models.DateField(null=False)
    expense_category = models.ForeignKey(ExpenseCategory, null=False)
    employee = models.ForeignKey(Employee, null=False)
    address = models.ForeignKey(ExpenseAddress, null=False)
    description = models.CharField(max_length=50, null=False, blank=False)
    pre_tax_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    tax_category = models.ForeignKey(TaxCategory)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    objects = ExpenseItemManager()

    def __unicode__(self):
        return "txn date = %s, employee=%s, description = %s, pre_tax_amount =%0.2f, tax_amount = %0.2f" % (
            self.transaction_date, self.employee, self.description, self.pre_tax_amount, self.tax_amount)


class ImportLog(models.Model):
    """
    Stores an audit trail of imports - associates upload files with expense item
    """
    file_name = models.CharField(max_length=255, null=False, blank=False)
    expense_items = models.ManyToManyField(ExpenseItem)

    def __unicode__(self):
        return "%s" % self.file_name




