Hello!
======

My name is Christine Davis, and this is the solution that I've put together for the Wave Apps programming challenge.

Installation
============

This solution expects Django 1.7 to be installed. There are many ways this can be done! One of them is to run the command `sudo pip install django`.

From the directory, where this README is located, if you could be so kind as to run the command `python manage.py syncdb`, that should set up the database, and give you the option to create a new superuser (please do).

Then, if you run the command `python manage.py runserver 0.0.0.0:8000`, the server will start, and you will be able to view the application at http://localhost:8000 (You will, of course, need to log in to access anything).

My Solution
===========
There is a form, that allows you to upload a .csv file. It will even attempt to inform you if there are problems with the file you're trying to upload. If your .csv file is valid, you will be presented with a page that shows the expenses totaled by month (but you are also able to see details about the upload and the individual expenses).

Beyond the base requirements, I have made it so once you have imported a file, it's possible to get back to a list of previous imports so you are able to view a previous import again. In a more expansive solution, there would be a way to discard an import (and its associated expenses), and to see all of the imported expenses at once.

For each import, while not specified in the requirements, the person who was logged in for the import, the date of the import, and the raw content of the file get stored, because expense data seems like the kind of thing that justifies having an audit-like record. The pre-checking and problem row listing that happens before the .csv data are imported are both pretty useful for dealing with the fuzziness of real world data that an application like this would expect to encounter.

Which is to say, I'm pleased with my solution in its way to deal with the unkindnesses of the real world, even though they were (mostly) not present in the same data provided.

I have included a small test suite for the import processing part of the code, since that's the part that I would expect to find the most problems. It can be run using `python manage.py test`. There is also a rudimentary django admin site for editing expenses available at http://localhost:8000/admin.