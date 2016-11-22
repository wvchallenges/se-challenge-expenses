"""Views related to the wsdc app."""

from django.views.generic import ListView
from django.views.generic.edit import CreateView, UpdateView
from django.contrib import messages
from django.urls import reverse

from wsdc.models import Company


class CompanyListView(ListView):
    """View for listing campaigns."""

    model = Company


class CompanyCreateView(CreateView):
    """View for creating a company."""

    model = Company
    fields = ['name', 'csv_file']

    def get_success_url(self, **kwargs):
        """Return url back to this created object."""
        company = self.object
        if not company:
            return '/'
        return reverse('company_edit', args=[company.id])

    def form_valid(self, form):
        """Send a success message when creating a company."""
        messages.add_message(self.request, messages.INFO, 'Success!')
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        """Return http response for a post action method.

        Once the company is created, run create_employee_data.
        """
        response = super().post(request, *args, **kwargs)
        company = self.object
        company.create_employee_data()
        return response


class CompanyEditView(CompanyCreateView, UpdateView):
    """View for editing a company."""

    pk_url_kwarg = 'id'

    def get_context_data(self, **kwargs):
        """Return Employee's related to this Company for use with the template."""
        context = super().get_context_data(**kwargs)
        if not self.object:
            return context
        context['employees'] = self.object.employees.all()
        return context
