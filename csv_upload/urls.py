from django.conf.urls import patterns, url
from csv_upload import views

urlpatterns = patterns('',
                       url(r'^$', views.upload_handler, name='upload_handler'),
#                      url(r'^(?P<poll_id>\d+)/$', views.detail, name='detail'),
                       url(r'^thanks/$', views.thanks, name='thanks'),
#                      url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
                      )

