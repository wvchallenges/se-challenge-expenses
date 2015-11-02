WaveProject.WaveImport is a Django answer to the SE-Challenge project.

WaveImport was done in Eclipse-Pydev4.4/Python2.7/Django1.8.5

After I initially completed the custom upload view, I thought it would be a better result and an enriching experience to reuse Django's admin interface.
Reusing the admin interface forced me to explore a number of concepts like signalling-handlers and a number of adapters but did complicate things too.

I invested some time exploring widgets and found a MonthYearWidget on StackOverFlow that is suited to the monthly total view, which I "inlined" beneath the CSV upload form.
I also invested time in the database design and feel that it was perhaps one of the better aspects of my implementation.
 
Overall I'm quite happy with my choices and feel like I've learned a lot about Django and 
although it's been quite a challenge getting the framework to behave as per expectations, it was, nevertheless a pleasant experience.
 
The project needs the usual steps before running:

- cd .../WoaveProject/
- python2.7 manage.py makemigrations WaveImport
- python2.7 manage.py migrate
- python2.7 manage.py createsuperuser

- At this point you'll be able to run the project, create admin user credentials then a custom credentials (for an end user) 
- Grant end user write access to CSV Expense Files and read access to Batch Periods 
- The rest should work as per project expect that the Period Total is only available in the Batch Periods view

Hope you like my take on the SE-Challenge and looking forward to more Django and Python coding projects at Wave!
Nabil Khoury