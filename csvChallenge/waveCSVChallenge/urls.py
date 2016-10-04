from django.conf.urls import url
from . import views

app_name = 'waveCSVChallenge'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^expensesByMonth/$', views.uploadCSV, name='uploadCSV')
]
