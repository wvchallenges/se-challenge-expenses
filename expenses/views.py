from __future__ import absolute_import, unicode_literals

from pyramid.view import notfound_view_config, view_config


@view_config(
    route_name='home',
    renderer='templates/home.mako',
    request_method='GET')
def home(request):
    return {'title': 'Upload CSV'}


@notfound_view_config(renderer='templates/404.mako')
def notfound_view(request):
    request.response.status = 404
    return {'title': 'Page Not Found'}
