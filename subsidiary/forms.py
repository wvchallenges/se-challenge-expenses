from django import forms
from datetime import datetime
from decimal import Decimal
from io import TextIOWrapper
from .models import *
import csv

class ExpenseUploadForm(forms.Form):
    expense_file = forms.FileField(label='', widget = forms.FileInput(attrs={'class':'form-control', 'accept':'.csv'}))
                
    def clean_expense_file(self):
        try:
            data = self.cleaned_data['expense_file']
            file = TextIOWrapper(data.file, encoding='ASCII')
            dialect = csv.Sniffer().sniff(file.read(1024))
            file.seek(0)
            return file
        except:
            raise forms.ValidationError('Csv file required.')
            
    def upload(self):
        expense_file = self.cleaned_data['expense_file']
        data = csv.DictReader(expense_file)
        
        for record in data:
            address = record['employee address'].split(',')
            city_postal = address.pop().split()
            address.append(city_postal[0])
            address.append(city_postal[1])
            if (len(address) < 5):
                address.insert(1, "")
            
            employee_record = Employee.objects.get_or_create(
                employee_name = record['employee name'], 
                address_line1 = address[0], 
                address_line2 = address[1], 
                city=address[2], 
                state = address[3], 
                zip_postal = address[4]
            )

            category_record = Category.objects.get_or_create(category_name = record['category'])
            
            tax_record = Tax.objects.get_or_create(tax_name = record['tax name'])
            
            expense_date = datetime.strptime(record['date'], '%m/%d/%Y')
            description = record['expense description']
            pretax_amount = Decimal(record['pre-tax amount'].replace(',',''))
            tax_amount = Decimal(record['tax amount'].replace(',',''))
            
            expense = Expense(
                employee = employee_record[0], 
                category = category_record[0], 
                expense_date = expense_date, 
                description = description, 
                tax = tax_record[0], 
                pretax_amount = pretax_amount,
                tax_amount = tax_amount
            )
            
            expense.save()