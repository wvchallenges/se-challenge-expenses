from __future__ import absolute_import, unicode_literals


def includeme(config):
    config.add_route('expenses save', '/expenses/save')
