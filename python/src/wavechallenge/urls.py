from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'wavechallenge.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^api/', include('upload.urls')),
)
