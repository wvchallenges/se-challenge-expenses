from django.conf.urls import patterns, url

urlpatterns = patterns('expenses.views',
    url(r'^$', 'expenses_list'),
    url(r'^add/$', 'expenses_add'),
)
