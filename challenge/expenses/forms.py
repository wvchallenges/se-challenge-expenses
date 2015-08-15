from django.forms import ModelForm

from challenge.expenses.models import Report


class ReportForm(ModelForm):
    class Meta:
        model = Report
        fields = ['name', 'file']
