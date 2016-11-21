from django.forms import ModelForm
from .models import ExpenseReport


class ExpenseReportForm(ModelForm):
    class Meta:
        model = ExpenseReport
        fields = ['report']
