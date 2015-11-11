import csv
from datetime import datetime

from .models import Employee, Expenses, File

class FileHandler(object):
    
    def __init__(self, f):
        self.uploaded_file = f
        self.file_object = File(name=f.name)
        self.file_object.save()

    def parse_uploaded_file(self):
        reader = csv.DictReader(self.uploaded_file)
        for row in reader:
            date = datetime.strptime(row['date'], "%m/%d/%Y")
            category = row['category']
            employee = Employee.get_employee(row['employee name'], row['employee address'])
            expense_description = row['expense description']
            pre_tax_amount = row['pre-tax amount'].replace(',', '')
            tax_name = row['tax name']
            tax_amount = row['tax amount'].replace(',', '')
            expense_object = Expenses(date=date, category=category,employee=employee, expense_description=expense_description, pre_tax_amount=pre_tax_amount, tax_amount=tax_amount, tax_name=tax_name, upload_file=self.file_object)
            expense_object.save()

