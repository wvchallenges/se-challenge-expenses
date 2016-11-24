from django.db import models
from datetime import datetime


class Document(models.Model):
    docfile = models.FileField()
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class DocumentEntry(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now)
    category = models.CharField(max_length=250, default=None)
    employee_name = models.CharField(max_length=250, default=None)
    employee_address = models.CharField(max_length=250, default=None)
    expense_description = models.CharField(max_length=500, default=None)
    pre_tax_amount = models.FloatField(default=None)
    tax_name = models.CharField(max_length=250, default=None)
    tax_amount = models.FloatField(default=None)


class MonthlyExpenditure(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, default=None)
    MONTH_CHOICES = (
        (1, "January"), (2, "February"),
        (3, "March"), (4, "April"),
        (5, "May"), (6, "June"),
        (7, "July"), (8, "August"),
        (9, "September"), (10, "October"),
        (11, "November"), (12, "December")
    )
    month = models.IntegerField(choices=MONTH_CHOICES)
    year = models.IntegerField()
    monthly_expenditure = models.FloatField(default=None)
