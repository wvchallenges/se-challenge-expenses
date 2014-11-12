from django import forms

class UploadFileForm(forms.Form):
    inputFile = forms.FileField()