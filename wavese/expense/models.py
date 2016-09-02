from django.db import models

# domain model
class CSVSource(models.Model):
    pass
    
class Tax(models.Model):
    source = models.ForeignKey(CSVSource, on_delete=models.CASCADE)
    description = models.CharField(max_length = 50)
    
class Category(models.Model):
    source = models.ForeignKey(CSVSource, on_delete=models.CASCADE)
    description = models.CharField(max_length = 200)
    
class Employee(models.Model):
    source = models.ForeignKey(CSVSource, on_delete=models.CASCADE)
    name = models.CharField(max_length = 50)
    address = models.CharField(max_length = 50)
    
class Expense(models.Model):
    tax = models.ForeignKey(Tax, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    source = models.ForeignKey(CSVSource, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.CharField(max_length = 50)
    preTaxAmount = models.DecimalField(max_digits=10, decimal_places=2)
    taxAmount = models.DecimalField(max_digits=10, decimal_places=2)

# batch item processing
import csv

"""
Wrap a reader that represents a csv so that certain csv-specific functionality 
can be encapsulated (eg capturing header rows).
"""
class CSVItemReader:
    def __init__(self, file, numHeaderRows=0, delimiter=",", quote='"'):
        self.csvReader = csv.reader(file, delimiter=delimiter, quotechar=quote)
        self.headerRows = []
        for skipHeader in range(0, numHeaderRows):
            self.headerRows.append(next(self.csvReader))
    
    def __iter__(self):
        return self.csvReader
    
    def next(self):
        return next(self.csvReader)
    
    def headers(self):
        return self.headerRows