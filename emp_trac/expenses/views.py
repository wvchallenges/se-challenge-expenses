from django.views.generic import TemplateView, ListView, FormView
from django.core.urlresolvers import reverse_lazy
from django.db.models import Sum, Count

from .forms import ExpenseUploadForm
from .models import Expense


class ExpenseUploadView(FormView):
    template_name = 'expenses/upload.html'
    form_class = ExpenseUploadForm
    success_url = reverse_lazy('expense_monthly_summary')

    def form_valid(self, form):
        csv_file = self.request.FILES['csv_expense_file']
        form.handle_uploaded_file(csv_file)
        return super(ExpenseUploadView, self).form_valid(form)

expense_upload = ExpenseUploadView.as_view()


class HelpView(TemplateView):
    template_name = 'expenses/help.html'

expense_help = HelpView.as_view()


class ExpenseMonthlySummaryView(TemplateView):

    template_name = 'expenses/monthly_summary.html'
    model = Expense

    def get_context_data(self, **kwargs):
        from django.db import connection
        truncate_date = connection.ops.date_trunc_sql('month', 'date')
        context = dict()
        qs = Expense.objects.extra({'month': truncate_date})
        context['report'] = qs.values('month').annotate(Sum('total_amount')).order_by('month')
        return context

expense_monthly_summary = ExpenseMonthlySummaryView.as_view()