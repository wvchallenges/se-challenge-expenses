from django import forms
from django.db import models
from django.db.models import Sum, Count

class CSVDocument(models.Model):
    note = models.CharField('Note (Ex: Company Name)', max_length=200)
    docfile = models.FileField('CSV Expense File', upload_to='documents/%Y/%m/%d')
    class Meta:
        verbose_name = "CSV Expense File"
        verbose_name_plural = "CSV Expense Files"
    
    def __str__(self): 
        return str(self.docfile)
    
class Category(models.Model):
    category_text = models.CharField('Category', max_length=200)
    class Meta:
        verbose_name_plural = "Categories"
    def __str__(self):
        return self.category_text

class Employee(models.Model):
    employee_name = models.CharField('Employee Name', max_length=200)
    employee_address = models.CharField('Employee Address', max_length=200)
    def __str__(self): 
        return self.employee_name

class Tax(models.Model):
    tax_text = models.CharField('Tax', max_length=200)
    tax_percent = models.DecimalField('Tax Percentage', max_digits = 5, 
                                      decimal_places = 3, null=True)# for future
    class Meta:
        verbose_name_plural = "Taxes"
    def __str__(self): 
        return self.tax_text

class BatchPeriod(models.Model):
    document = models.ForeignKey(CSVDocument)
    monthyear = models.DateField('Batch Period')
    def total(self):
        q = BatchPeriod.objects.filter(id=self.id).annotate(
                pretax_total=Sum('expense__pretax_amount'), 
                tax_total=Sum('expense__tax_amount'))[0]
        return q.pretax_total + q.tax_total
    
class Expense(models.Model):
    period = models.ForeignKey(BatchPeriod)
    date = models.DateField('Date')
    category = models.ForeignKey(Category)
    employee = models.ForeignKey(Employee)
    tax = models.ForeignKey(Tax)
    expense_desc = models.TextField('Description', max_length=200)
    pretax_amount = models.DecimalField('Pre-Tax Amount', max_digits = 19, decimal_places = 2)
    tax_amount = models.DecimalField('Tax Amount', max_digits = 19, decimal_places = 2)
    def __str__(self):
        return '{0} - {1}'.format(self.employee.employee_name, self.expense_desc)
    
    def total(self):
        return self.pretax_amount + self.tax_amount
