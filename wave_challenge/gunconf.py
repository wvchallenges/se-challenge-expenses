# -*- coding: utf-8 -*-

workers = 3

bind = 'unix:/tmp/wave_challenge.sock'
pidfile = '/tmp/wave_challenge.pid'
user = 'ubuntu'

daemon = True

proc_name = 'wave_challenge'
errorlog = '/var/log/gunicorn/wave_challenge.log'

backlog = 100
max_requests = 500
