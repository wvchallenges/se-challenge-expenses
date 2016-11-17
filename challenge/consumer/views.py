from django.views.generic.edit import FormView

from .forms import CSVMigrateForm


class CSVMigrateView(FormView):
    """ Migrates data from files in CSV format to the database. """
    form_class = CSVMigrateForm
    template_name = "csvmigrate.html"
    success_url = '/'

    def form_valid(self, form):
        return super(CSVMigrateView, self).form_valid(form)
