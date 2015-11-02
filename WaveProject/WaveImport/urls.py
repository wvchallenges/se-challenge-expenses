from django.conf.urls import url

from .views import upload_file

urlpatterns = [
    url(r'^csv_import/$', upload_file, name='csv-import'),
]