from django.conf.urls import patterns, url, include
import views


urlpatterns = patterns('',
                       url('', include('social.apps.django_app.urls', namespace='social')),
                       url('', include('django.contrib.auth.urls', namespace='auth')),
                       url(r'^$', views.form, name='form'),
                       url(r'^index$', views.index, name='index')
                       )
