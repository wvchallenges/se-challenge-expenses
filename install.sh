#!/bin/bash
mkdir wave_se_challenge_bensuire
cd wave_se_challenge_bensuire
virtualenv venv
cd venv
source bin/activate
pip install Django
git clone https://github.com/bsuire/se-challenge
cd se-challenge/wave_accounting/
python manage.py migrate
python manage.py runserver

