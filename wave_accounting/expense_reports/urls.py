from django.conf.urls import url

from expense_reports import views

urlpatterns = [
            url(r'^$', views.upload, name='upload'),
            #url(r'^summary/$', views.summary, name='summary'),
            #url(r'^(?P<album_name>\w+)/$', views.gallery, name='gallery'),
            
            ]

