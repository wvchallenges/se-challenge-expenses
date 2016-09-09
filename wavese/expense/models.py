from django.db import models

from datetime import datetime
from decimal import Decimal
from locale import atof
import locale

# batch processing bookkeeping
class Job:
    def __init__(self, itemReader, itemProcessor, itemWriter, batchInterval=1, params={}):
        if (batchInterval < 1 or batchInterval != int(batchInterval)):
            raise ValueError("batchInterval must be a positive integer")
        self.batchInterval = batchInterval
        self.itemReader = itemReader
        self.itemProcessor = itemProcessor
        self.itemProcessor.job = self
        self.itemWriter = itemWriter
        self.params = params
    
    def before(self):
        pass
    
    def after(self):
        pass
    
    def run(self):
        self.before()
        batch = []
        for row in self.itemReader:
            batch.append(row)
            if (len(batch) >= self.batchInterval):
                self.processBatch(batch)
                batch = []
        self.processBatch(batch)
    
    def processBatch(self, batch):
        outputItems = []
        for item in batch:
            outputItems.append(self.itemProcessor.process(item))
        self.itemWriter.write(outputItems)

class ItemProcessor:
    
    def process(self, item):
        return item
    
class ItemWriter:
    def write(self, items):
        pass
    
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

# batch item processing components
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
    
class CSVJob(Job):
    def before(self):
        self.csvSource = CSVSource.objects.get(pk=self.params['csvSourceId'])
        
class CSVRowToExpenseModelProcessor(ItemProcessor):
    def process(self, item):
        locale.setlocale(locale.LC_ALL, 'english-us') # XXX potentially NOT cross-platform, windows-specific 
        expense = Expense(date=datetime.strptime(item[0], '%m/%d/%Y').strftime('%Y-%m-%d'), description=item[4], preTaxAmount=Decimal(atof(item[5].strip())), taxAmount=Decimal(atof(item[7].strip())))
        expense.tax, taxCreated = Tax.objects.get_or_create(source=self.job.csvSource, description=item[6])
        expense.category, categoryCreated = Category.objects.get_or_create(source=self.job.csvSource, description=item[1])
        expense.employee, employeeCreated = Employee.objects.get_or_create(source=self.job.csvSource, name=item[2], address=item[3])
        expense.source = self.job.csvSource
        return expense
    
class ExpenseItemWriter(ItemWriter):
    def write(self, items):
        Expense.objects.bulk_create(items)