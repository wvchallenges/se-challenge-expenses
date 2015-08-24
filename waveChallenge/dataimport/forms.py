__author__ = 'Can Zhang'

from django import forms


class UploadFileForm(forms.Form):
    file = forms.FileField()