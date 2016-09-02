from django.test import TestCase

from .models import CSVItemReader

import io

# Create your tests here.
class CSVItemReaderTest(TestCase):
    testString = """date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06 
12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63 
"""
    testRows = [
        ["date", "category", "employee name", "employee address", "expense description", "pre-tax amount", "tax name", "tax amount"],
        ["12/1/2013", "Travel", "Don Draper", "783 Park Ave, New York, NY 10021", "Taxi ride", " 350.00 ", "NY Sales tax", " 31.06 "],
        ["12/15/2013", "Meals and Entertainment", "Steve Jobs", "1 Infinite Loop, Cupertino, CA 95014", "Team lunch", " 235.00 ", "CA Sales tax", " 17.63 "],
    ]
    
    def test_noHeader(self):
        self.headerRowTest(csvStream=io.StringIO(self.testString))
    
    def test_oneHeaderRows(self):
        self.headerRowTest(csvStream=io.StringIO(self.testString), numHeaderRows=1)
    
    def test_twoHeaderRows(self):
        self.headerRowTest(csvStream=io.StringIO(self.testString), numHeaderRows=2)
    
    def test_tooManyHeaderRows(self):
        with self.assertRaises(StopIteration):
            self.headerRowTest(csvStream=io.StringIO(self.testString), numHeaderRows=len(self.testRows) + 1)
    
    def headerRowTest(self, csvStream, numHeaderRows=0):
        csvItemReader = CSVItemReader(csvStream, numHeaderRows=numHeaderRows)
        recordCount = 0
        for row in csvItemReader:
            recordCount = recordCount + 1
            self.assertEquals(row, self.testRows[numHeaderRows + recordCount - 1])
        self.assertEquals(csvItemReader.headerRows, self.testRows[:numHeaderRows])
