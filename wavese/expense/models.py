from django.db import models

# batch processing bookkeeping
class Job(models.Model):
    def __init__(self, itemReader, batchInterval=1, params={}):
        if (batchInterval < 1 or batchInterval != int(batchInterval)):
            raise ValueError("batchInterval must be a positive integer")
        self.batchInterval = batchInterval
        self.itemReader = itemReader
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
        # TODO self.tail is for testing purposes.  remove from final product 
        self.tail = self.processBatch(batch)
        return self.tail
    
    def processBatch(self, batch):
        return batch

class JobParameters(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    key = models.CharField(max_length = 50)
    value = models.CharField(max_length = 50)

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
        # make sure source id exists
        CSVSource.objects.get(pk=self.params['csvSourceId'])