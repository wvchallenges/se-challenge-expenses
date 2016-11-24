from django import forms
from .models import MonthlyExpenditure


def validate_file_extension(value):
        if not value.name.endswith('.csv'):
            raise forms.ValidationError("Only CSV file is accepted")


class UploadFileForm(forms.Form):
    docfile = forms.FileField(
        label='Select a CSV file to import:',
        validators=[validate_file_extension]
    )


class SelectYearForm(forms.Form):
    year = forms.ModelChoiceField(
        label='Select a year to plot:',
        queryset=MonthlyExpenditure.objects.all().values_list('year', flat=True).distinct(),
        empty_label=None,
        widget=forms.Select()
    )
