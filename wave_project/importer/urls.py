from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from importer.views import CsvImportView, UploadSummaryView


urlpatterns = patterns('',
                       url(r'^$', TemplateView.as_view(template_name="app.html"),
                           name='home'),

                       url(r'^csvimport/$', CsvImportView.as_view(template_name="_file_upload.html"),
                           name='csv_import_view'),

                       url(r'^uploadsummary/(?P<upload_id>\w+)/$',
                           UploadSummaryView.as_view(template_name="_csvsummary.html"),
                           name='upload_summary_view'),

)


