from django.views.generic import TemplateView, ListView, FormView
from django.core.urlresolvers import reverse_lazy

from .forms import ExpenseUploadForm
from .models import Expense


class ExpenseUploadView(FormView):
    template_name = 'expenses/upload.html'
    form_class = ExpenseUploadForm
    success_url = reverse_lazy('expense_list')

    def form_valid(self, form):
        file = self.request.FILES['csv_expense_file']
        form.csv_load_data(file)
        return super(ExpenseUploadView, self).form_valid(form)

upload = ExpenseUploadView.as_view()


class HelpView(TemplateView):
    template_name = 'expenses/help.html'

help = HelpView.as_view()


class ExpenseListView(ListView):

    template_name = 'expenses/list.html'

    model = Expense

    # def get_context_data(self, **kwargs):
    #     context = super(ArticleListView, self).get_context_data(**kwargs)
    #     return context

list = ExpenseListView.as_view()