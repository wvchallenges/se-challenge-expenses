from django.conf.urls import patterns, include, url
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse_lazy
from django.contrib import admin

urlpatterns = patterns('',
    #url(r'^admin/', include(admin.site.urls)),
    url(r'^expenses/', include('expenses.urls')),
    url(r'^$', lambda r: HttpResponseRedirect(reverse_lazy('expense_upload'))),
)
