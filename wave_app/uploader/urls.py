from django.conf.urls import url

from . import views


app_name = 'uploader'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^upload', views.upload, name='upload'),
    url(r'^totals', views.totals, name='totals'),
    url(r'^parse_csv', views.parse_csv, name='parse_csv'),
]
