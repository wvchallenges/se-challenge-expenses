from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^expenses/', include('expenses.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
