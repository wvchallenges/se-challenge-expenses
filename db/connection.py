#!/usr/bin/python
import sqlobject
from sqlobject.mysql import builder


conn = builder()(user='wave_challenge_user', password='wave_challenge_passwordA1!',
				 host='localhost', db='wave_challenge_db')
