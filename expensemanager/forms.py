from django import forms
from .csvfilefield import CSVFileField


class UploadFileForm(forms.Form):
    file = CSVFileField(
        label='Select your CSV file'
    )
