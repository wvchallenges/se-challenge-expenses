from django.db import models


class Report(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255, verbose_name='Name of this report')
    file = models.FileField()


class Category(models.Model):
    name = models.CharField(max_length=255, db_index=True)


class Tax(models.Model):
    name = models.CharField(max_length=255, db_index=True)


class Employee(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()

    class Meta:
        index_together = [
            ['name', 'address']
        ]


class Expense(models.Model):
    report = models.ForeignKey(Report, db_index=True)
    date = models.DateTimeField()
    employee = models.ForeignKey(Employee)
    description = models.TextField()
    tax = models.ForeignKey(Tax)
    pre_tax_amount = models.DecimalField(max_digits=20, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=20, decimal_places=2)

    @property
    def total(self):
        return self.pre_tax_amount + self.tax_amount
