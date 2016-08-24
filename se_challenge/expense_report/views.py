from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import View
from django.views.generic.list import ListView

from expense_report.forms import ExpenseCSVUploadForm
from expense_report.models import ExpenseReport

from expense_report.utils import CSVHandler


class ExpenseReportUpload(View):
    '''
    This view is used for uploading csv file and putting the data from the
    csv file into the DB.
    '''
    template_name = 'expense_report.html'
    initial = {'key': 'value'}

    def get(self, request, *args, **kwargs):
        return render(
            request, self.template_name, {'form': ExpenseCSVUploadForm()})

    def post(self, request, *args, **kwargs):
        form = ExpenseCSVUploadForm(request.POST, request.FILES)

        # If we get a valid csv file add it to database,
        # Else send some error message back.
        if form.is_valid():
            cleaned_data = form.cleaned_data
            CSVHandler(form.cleaned_data['expense_file'])
            return HttpResponseRedirect('expense-list')

        return render(request, self.template_name, {'form': form})


class ExpenseReportList(ListView):
    '''
    This view shows All expense in a table.
    '''
    model = ExpenseReport
    template_name = 'expense_report_list.html'


class EmptyExpenseList(View):

    def post(self, request, *args, **kwargs):
        ExpenseReport.objects.all().delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
