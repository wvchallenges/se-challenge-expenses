from django.views.generic import FormView, ListView

from .forms import ReportForm


class UploadView(FormView):
    form_class = ReportForm
    template_name = 'upload.html'

    def form_valid(self, form):

        return super(UploadView, self).form_valid(form)
