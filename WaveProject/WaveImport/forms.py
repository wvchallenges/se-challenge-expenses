from django import forms

from .models import CSVDocument, BatchPeriod
from .widgets import MonthYearWidget

class UploadFileForm(forms.Form):
#     note = forms.CharField(max_length=50)
    docfile = forms.FileField(label='Import CSV File')

class NoteField(forms.CharField):
    def clean(self, value):
        try:
            cleaned = super(NoteField, self).clean(value)
        except forms.ValidationError:
            raise forms.ValidationError(u'Provide identifying note (Ex: company name).')
        else:
            return cleaned

class CSVField(forms.FileField):
    def clean(self, *args):
        try:
            cleaned = super(CSVField, self).clean(*args)
        except forms.ValidationError:
            raise forms.ValidationError(u'Provide path to a Comma-separated-Values file on your system.')
        else:# actual processing
            return cleaned
            
class CSVDocForm(forms.ModelForm):
    note = NoteField(max_length=200)
    docfile = CSVField()
    class Meta:
        model = CSVDocument
        fields = '__all__'
     
class BatchPeriodForm(forms.ModelForm):
    monthyear = forms.DateField(label='Batch Period', 
        widget=MonthYearWidget(required=True))
    total = forms.DecimalField(label='Period Total')
    class Meta:
        model = BatchPeriod
        fields = '__all__'