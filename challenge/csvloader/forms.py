from django import forms

from csvloader.models import Import

class UploadForm(forms.Form):
    imported_file = forms.FileField()

    def save(self, user):
        raw_data = self.cleaned_data.get('imported_file').read()
        imported = Import(
            imported_by=user,
            raw_data=raw_data
        )
        imported.save()
        return imported
