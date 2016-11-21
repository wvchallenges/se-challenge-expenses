from django.db import models


class Expense(models.Model):
    expense_report = models.ForeignKey(
        "ExpenseReport",
        null=True,
        on_delete=models.CASCADE
    )
    date = models.DateField(null=True)
    category = models.CharField(max_length=50)
    employee_name = models.CharField(max_length=35)
    employee_address = models.CharField(max_length=150)
    expense_description = models.CharField(max_length=150)
    pretax_amount = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True
    )
    tax_name = models.CharField(max_length=35)
    tax_amount = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True
    )

class ExpenseReport(models.Model):
    report = models.FileField(upload_to="expense_reports/", null=True)
