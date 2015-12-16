from django.conf.urls import url
from django.contrib import admin
from django.conf import settings

from consume.views import home_page, remove_csv_file

urlpatterns = [
    url(
        regex=r'^$',
        view=home_page,
        name='home'
    ),
    url(
        regex=r'^csv_file/delete/(?P<csvfile_id>\d+)$',
        view=remove_csv_file,
        name='remove_csv_file'
    ),
    url(
        regex=r'^admin/',
        view=admin.site.urls,
        name='admin'
    ),
    url(
        r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': False}
    ),
]
