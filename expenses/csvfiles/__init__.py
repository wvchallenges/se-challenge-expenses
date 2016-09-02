from __future__ import absolute_import, unicode_literals


def includeme(config):
    config.add_route('csvfiles view', '/csvfiles/view/{csv_file_id}')
