from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static

from wavese.app.views import home, report

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^home/$', home, name='home'),
                       url(r'^report/$', report, name='report')
                       ) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

