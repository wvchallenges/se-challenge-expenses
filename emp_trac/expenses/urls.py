from django.conf.urls import patterns, url

urlpatterns = patterns('expenses.views',
    url(r'^upload/$', 'upload', name='expense_upload'),
    url(r'^list/$', 'list', name='expense_list'),
    url(r'^help/$', 'help', name='expense_help'),
)
