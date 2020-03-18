from django.conf.urls import patterns, url


from upload import views

urlpatterns = patterns('',
    url(r'^index/', views.index, name='index'),
    url(r'^upload/', views.upload, name='upload'),
)
