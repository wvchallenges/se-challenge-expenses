# Wave Softare development challenge as accomplished by me
It is done using Python 3.3.5 and Django 1.7 It uses built-in sqlite3 db so no database setup is required. Standard python development tools such as virtualenv, virtualenvwrapper and pip3 are required.

Once everything is set, pease installed all the dependencies, by running $pip install -r requirements.txt in the root of the project folder.

I didn't bother with server version so the development version runs on the usual localhost:800/ the only two urls involved are:
    / -- file upload form
    /total -- table view of last uploaded expenses

I haven't used Django in a very long time, so working with a not particularly familiar framework was interesting, and as I was about to do something unfamiliar, I desided to try out Python 3, which in the end was much less of a hurdle. I hoped to follow PEP 8 and coding various other coding style guide to make code readable.

I used (read: abused) functional tools and list comprehensions, I almost made a good use of generators, however I have lists in a few wrong places so this code is much more memory intensive than it ideally could be. I didn't use any OOP, apart from ORM abstractions, because the problem just didn't seem to be big enough to warrant passing around state of the data.
