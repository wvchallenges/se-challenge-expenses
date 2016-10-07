from django.conf.urls import url

from . import views

app_name = 'accounting'

# URL routes
urlpatterns = [
    url(r'^$', views.index, name='index')
]