Wave Challenge Monthly Expense Viewer
=====================================

Requirements
------------
Listed in requirements.txt


Development
-----------
Run the app:
``python manage.py runserver``


Production
----------
Run the app::

sudo service wave_challenge_expenses start

Stop the app::

sudo service wave_challenge_expenses stop

View logs::

cat /var/log/gunicorn/wave_challenge.log


Production deployment on Ubuntu
-------------------------------
*deploy in /home/ubuntu/se-challenge/*

1. Create virtualenv::

    virtualenv venv

2. Activate the app's virtual environment::

    source venv/bin/activate

3. Install requirements::

    pip install -r requirements.txt

4. Install the boot scripts::

    sudo cp bin/wave_challenge_expenses /etc/init.d/wave_challenge_expenses
    sudo update-rc.d wave_challenge_expenses defaults

5. Customize django settings file (secret_key, database, disable DEBUG, etc.)

6. Initialize database::

    python wave_challenge/manage.py migrate

7. Configure web server/modify gunconf.py to communicate with each other


