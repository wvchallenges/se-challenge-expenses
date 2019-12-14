from django.conf.urls import url

from . import views

app_name = "expenses"
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^upload/$', views.upload, name='upload'),
]
