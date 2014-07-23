from django.conf.urls import patterns, include, url
from django.contrib.auth.views import login, logout

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'WaveUp.views.home', name='home'),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^csv_upload/', include('csv_upload.urls', namespace="csv_upload")),
    url(r'^accounts/login/$',  login),
    url(r'^accounts/logout/$', logout),
    url(r'^$', include('csv_upload.urls', namespace="csv_upload")),  # quick hack for accessing this small tool from root url
)
