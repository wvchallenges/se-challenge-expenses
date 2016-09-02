from __future__ import absolute_import, unicode_literals

import pyramid_mako
from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory

# Alias required due to name collisions
from expenses import expenses as expenses_package, csvfiles, models


def main(global_config, **settings):
    """
    This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)

    # This is insecure but this application stores no sensitive information
    # in the session and cross site scripting is not a concern.
    session_factory = SignedCookieSessionFactory('!@:#$N as;92')
    config.set_session_factory(session_factory)

    config.include(pyramid_mako)
    config.include(models)

    # Routes
    config.add_static_view(
        path='expenses:static',
        name='static',
        cache_max_age=3600)
    config.add_route('home', '/')
    config.include(expenses_package)
    config.include(csvfiles)

    config.scan(ignore=str('expenses.tests'))
    return config.make_wsgi_app()
