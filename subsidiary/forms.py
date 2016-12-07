from django import forms
from io import TextIOWrapper
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
        pass