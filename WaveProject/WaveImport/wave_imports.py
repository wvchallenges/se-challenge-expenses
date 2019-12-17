# import various file formats into wave database
# from collections import OrderedDict
from operator import itemgetter
import csv
from datetime import datetime

from .models import Employee, BatchPeriod, Expense, Tax, Category

EXPECTED_HEADERS = (
    'date',
    'category',
    'employee name', 
    'employee address',
    'expense description',
    'pre-tax amount',
    'tax name',
    'tax amount')

class WaveCVSImportErr(Exception):
    ERRORMSG = """Incompatible CSV Headers:
Check your email for the valid format and try again."""
    def __init__(self):
        super(WaveCVSImportErr, self).__init__(WaveCVSImportErr.ERRORMSG)

class CSVBatch(object):
    # make the following itemgetters static so they're initialized only 
    # once every time module is reloaded.
    empname_get = itemgetter(EXPECTED_HEADERS.index('employee name'))
    empaddr_get = itemgetter(EXPECTED_HEADERS.index('employee address'))
    tax_get = itemgetter(EXPECTED_HEADERS.index('tax name'))
    cat_get = itemgetter(EXPECTED_HEADERS.index('category'))
    date_get = itemgetter(EXPECTED_HEADERS.index('date'))
    exp_get = itemgetter(EXPECTED_HEADERS.index('expense description'))
    amount_get = itemgetter(EXPECTED_HEADERS.index('pre-tax amount'))
    tamount_get = itemgetter(EXPECTED_HEADERS.index('tax amount'))
    def __init__(self, csv_document):
        '''initialize batch with csv document then import it'''
        self._csv_document = csv_document
        self.import_doc()
    
    def import_doc(self):
        '''open, validate, parse and import CSV file into Wave DB'''
        with open(self._csv_document.docfile.path, 'r') as csv_source:
            reader = csv.reader(csv_source, delimiter=',')
            for i, row in enumerate(reader):
                if i == 0:#first row is header row
                    csv_headers = tuple([c.strip().lower() for c in row])
                    if csv_headers != EXPECTED_HEADERS:
                        raise WaveCVSImportErr()
                else:
                    csv_record = [v.strip() for v in row]
                    self.process_rec(csv_record)

    def process_rec(self, csv_record):
        '''process individual csv file rows/records.'''
        # create employee rec only if no existing rec matches name and address
        employee, _ = Employee.objects.get_or_create(
            employee_name= CSVBatch.empname_get(csv_record), 
            employee_address= CSVBatch.empaddr_get(csv_record) )
        # create tax type rec only if no existing rec matches tax name
        taxo, _ = Tax.objects.get_or_create(
            tax_text= CSVBatch.tax_get(csv_record) )
        # create category rec only if no existing rec matches category desc
        cat, _ = Category.objects.get_or_create(
            category_text= CSVBatch.cat_get(csv_record) )
        # create expense period if we haven't seen it before
        date = datetime.strptime(CSVBatch.date_get(csv_record), "%m/%d/%Y")
        period, _ = BatchPeriod.objects.get_or_create(
            document=self._csv_document, 
            monthyear= date.replace(day=1) )
        expense = Expense.objects.create(
            period= period,
            date= date,
            category= cat,
            employee= employee, 
            tax= taxo,
            expense_desc= CSVBatch.exp_get(csv_record),
            pretax_amount= CSVBatch.amount_get(csv_record).replace(',',''),
            tax_amount= CSVBatch.tamount_get(csv_record).replace(',','') )
        return expense    