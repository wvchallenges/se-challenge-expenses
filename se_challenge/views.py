from django.views.generic import FormView, ListView, TemplateView
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from django.contrib import messages

from .forms import ReportForm
from .models import Expense, Report
from .utils import process_report


class UploadView(FormView):
    form_class = ReportForm
    template_name = 'upload.html'

    def form_valid(self, form):

        instance = form.save(commit=True)
        try:
            process_report(instance)
        except ValidationError as e:
            instance.delete()
            messages.add_message(self.request, messages.ERROR, str(e))
            return super(UploadView, self).form_invalid(form)

        return redirect('expense-list')


class ExpenseLiseView(ListView):
    template_name = 'report.html'
    model = Expense
    ordering = 'date'


class NukeView(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        Report.objects.all().delete()
        return redirect('upload')
