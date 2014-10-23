from django.shortcuts import get_object_or_404
from django.views.generic import FormView, DetailView
from django.views.generic.base import TemplateView

from importer.csv_importer import CsvImporter
from importer.data_controllers import WaveCsvDataController
from importer.forms import UploadFileForm
from importer.mixins import JSONResponseMixin
from importer.models import ImportLog
from importer.summary_calculator import MonthlySummaryCalculator


class HomeView(TemplateView):
    pass


class CsvImportView(FormView, JSONResponseMixin):
    form_class = UploadFileForm
    template_name = "_file_upload.html"
    ajax_context_object_name = 'response'

    def __init__(self, **kwargs):
        super(CsvImportView, self).__init__(**kwargs)

    def get_initial(self):
        return super(CsvImportView, self).get_initial()

    def form_invalid(self, form):
        return super(CsvImportView, self).form_invalid(form)

    def form_valid(self, form):
        """
        Create the CSV Controller which will persist the CVS File

        :param UploadFileForm form: form_class instance
        :return:
        """

        upload_file = form.cleaned_data['file']

        csv_data_controller = WaveCsvDataController(upload_file.name)
        upload_id = CsvImporter(csv_data_controller).import_data(csv_file=upload_file)

        context = self.get_context_data()
        response = context[self.ajax_context_object_name] = {}
        response['upload_id'] = upload_id

        return self.render_to_response(context=context)

    def render_to_response(self, context, **response_kwargs):
        """
        if method is GET then the form is being presented for the first time to use
        the default super implementation.

        Otherwise, if POST then force execution to go to JSONResponseMixin - which will be
        an ajax request.
        """

        if self.request.method == 'POST':
            return JSONResponseMixin.render_to_response(self, context)
        else:
            return super(CsvImportView, self).render_to_response(context, **response_kwargs)

    def dispatch(self, request, *args, **kwargs):
        return super(CsvImportView, self).dispatch(request, *args, **kwargs)


class UploadSummaryView(DetailView):
    """
    Calculates and returns a rendered view for a given upload session, ImportLog.  The kwarg of upload_id
    maps to the PK of a ImportLog record.
    """

    summary_calculator = MonthlySummaryCalculator()

    def get(self, request, *args, **kwargs):
        return super(UploadSummaryView, self).get(request, *args, **kwargs)

    def get_object(self, queryset=None):
        """
        Get the Import Log for the given upload_id value

        :return:    ImportLog record where PK = upload_id
        """
        return get_object_or_404(ImportLog, pk=self.kwargs['upload_id'])

    def get_context_data(self, **kwargs):
        """
        Gets the summary data for the given ImportLog object returned in get_object.

        :param kwargs: kwargs.
        :return: context_data
        """

        context_data = super(UploadSummaryView, self).get_context_data(**kwargs)
        import_log = context_data['object']

        summary_data = self.summary_calculator.calculate_summary(import_log)
        context_data['summary_data'] = summary_data
        context_data['upload_file_name'] = import_log.file_name

        return context_data
