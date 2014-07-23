from django import forms

class UploadFileForm(forms.Form):
        #csvfile = forms.CharField(max_length=100)
        csvfile  = forms.FileField()

