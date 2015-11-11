from django import forms

class UploadFileForm(forms.Form):
    form_file = forms.FileField()
