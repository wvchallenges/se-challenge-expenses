"""wsdc URL Configuration."""
from django.conf.urls import url
from django.contrib import admin

from wsdc.views import CompanyListView, CompanyCreateView, CompanyEditView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^company/$', CompanyCreateView.as_view(), name="company_create"),
    url(r'^company/(?P<id>[0-9]+)/$', CompanyEditView.as_view(), name="company_edit"),
    url(r'^$', CompanyListView.as_view(), name="company_list"),
]
