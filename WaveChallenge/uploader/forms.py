from django import forms

class CsvUploadForm(forms.Form):
    docfile = forms.FileField(label='Select CSV file')
