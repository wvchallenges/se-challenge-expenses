from django.conf.urls import patterns, include, url
from django.contrib import admin

from csvloader.views import UploadView, ImportView, ImportListView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'challenge.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^import/$', ImportListView.as_view(), name='list_imports'),
    url(r'^import/(?P<id>\d+)/$', ImportView.as_view(), name='show_import'),
    url(r'^$', UploadView.as_view(), name='upload'),
)
