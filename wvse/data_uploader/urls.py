from django.conf.urls import patterns, url

from data_uploader import views

urlpatterns = patterns('',
    url(r'^$', views.upload, name='upload'),
)
