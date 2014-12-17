from django.conf.urls import patterns, url
from challenge import views

urlpatterns = patterns(
    '',
    url(r'^total/$', views.total_expenses, name='total_expenses'),
    url(r'^$', views.csv_upload, name='csv_upload'),
)
