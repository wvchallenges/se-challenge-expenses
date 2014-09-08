from django.conf.urls import patterns, include, url
from django.contrib import admin

from csvloader.views import UploadView, ImportView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'challenge.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^upload/', UploadView.as_view(), name='upload'),
    url(r'^import/(?P<id>\d+)/', ImportView.as_view(), name='show_import')
)
