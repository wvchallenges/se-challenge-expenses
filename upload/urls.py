from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^list_files/$', views.list_files, name='list_files'),
    url(r'^details/(?P<document_id>[0-9]+)/$', views.details, name='details'),
]
