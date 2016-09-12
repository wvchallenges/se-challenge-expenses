from django.db import models, transaction
from datetime import datetime
from decimal import Decimal
from locale import atof
import locale, uuid

# batch processing bookkeeping
class JobExecutionListener:
    def before(self):
        pass
    
    def after(self):
        pass
    

class Job(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    def __init__(self, itemReader, itemProcessor, itemWriter, jobExecutionListener=JobExecutionListener(), batchInterval=1, params={}):
        if (batchInterval < 1 or batchInterval != int(batchInterval)):
            raise ValueError("batchInterval must be a positive integer")
        
        super(Job, self).__init__()
        
        self.batchInterval = batchInterval
        self.itemReader = itemReader
        self.itemProcessor = itemProcessor
        self.itemProcessor.job = self
        self.itemWriter = itemWriter
        self.jobExecutionListener = jobExecutionListener
        self.params = params
        
        self.save()
        
    # Save the Job and its parameters in a single transaction so that no information is lost.  A one-to-many relation 
    # between Job and JobParameter makes sense because a JobParameter makes no sense outside the context of a Job. 
    # Django does not have this relationship so it needs to be done manually.  
    @transaction.atomic
    def save(self):
        super(Job, self).save()
        for key, value in self.params.items():
            JobParameter(job=self, key=key, value=value).save()
        
    def run(self):
        self.jobExecutionListener.before()
        batch = []
        for row in self.itemReader:
            batch.append(row)
            if (len(batch) >= self.batchInterval):
                self.processBatch(batch)
                batch = []
        self.processBatch(batch)
        self.jobExecutionListener.after()
    
    def processBatch(self, batch):
        outputItems = []
        for item in batch:
            outputItems.append(self.itemProcessor.process(item))
        self.itemWriter.write(outputItems)
        
class JobParameter(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    key = models.CharField(max_length = 50)
    value = models.CharField(max_length = 50)
    
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
    source = models.ForeignKey(CSVSource, on_delete=models.DO_NOTHING, null=True)
    job = models.ForeignKey(Job, on_delete=models.DO_NOTHING, null=True)
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
    
class CSVRowToExpenseModelProcessor(ItemProcessor):
    def process(self, item):
        job = self.job
        csvSource = CSVSource.objects.get(pk=job.params['csvSourceId'])
        locale.setlocale(locale.LC_ALL, 'english-us') # XXX potentially NOT cross-platform, windows-specific 
        expense = Expense(date=datetime.strptime(item[0], '%m/%d/%Y').strftime('%Y-%m-%d'), 
            description=item[4], 
            preTaxAmount=Decimal(atof(item[5].strip())), 
            taxAmount=Decimal(atof(item[7].strip())), 
            source=csvSource, 
            job=job)
        expense.tax, taxCreated = Tax.objects.get_or_create(source=csvSource, description=item[6])
        expense.category, categoryCreated = Category.objects.get_or_create(source=csvSource, description=item[1])
        expense.employee, employeeCreated = Employee.objects.get_or_create(source=csvSource, 
            name=item[2], address=item[3])
        return expense
    
class ExpenseItemWriter(ItemWriter):
    def write(self, items):
        Expense.objects.bulk_create(items)