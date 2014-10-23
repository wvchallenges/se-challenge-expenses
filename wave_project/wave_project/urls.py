from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^import/', include('importer.urls')),
                       url(r'^jsreverse/$', 'django_js_reverse.views.urls_js', name='js_reverse'),
)
