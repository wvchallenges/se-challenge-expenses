import os
from django import forms


class CSVFileField(forms.FileField):
    """
    Same as forms.FileField, but can only accept .csv files
    """
    def clean(self, *args, **kwargs):
        data = super(CSVFileField, self).clean(*args, **kwargs)
        filename = data.name
        ext = os.path.splitext(filename)[-1]
        if ext.lower() != ".csv":
            raise forms.ValidationError("This is not a CSV File!")
