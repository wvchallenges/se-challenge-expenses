from django.conf.urls import patterns, url


urlpatterns = patterns(
    'challenge.expenses.views',
    url(r'^upload/$', 'upload', name='expenses_upload'),
    url(r'^report/(\d+)?/?$', 'report', name='expenses_report'),
)
