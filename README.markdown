# Wave Software Development Challenge
The application is built with an extremely simple stack, Python 3 + Flask + SQLite3 on the server-side and Backbone.js on the frontend. The frontend also includes Bootstrap, [Chartist](https://github.com/gionkunz/chartist-js) and [Animate.css](https://github.com/daneden/animate.css) for styling.

What I'm most proud of is that the application feels pretty whole to me. It's not just some little barebones app that was whipped up with no effort or thought to things like error cases or UI. I also think that I was able to write a pretty clean little Flask app, that uses effective Python techniques. The generator expression in the CSV parsing endpoint was particularly cool to me (I've never gotten the chance to use one before so). The frontend also turned out better than expected because I admittedly haven't done a lot frontend web development since my job at Fan.si. Overall I think that this application showcases my ability as a skilled, thoughtful full-stack developer.

## Installing
Installing is dead-simple just use the included requirements.txt
```
pip install -r requirements.txt
```

## Running
Ensure that you're using your Python 3 binary. *Note: this was developed with Python 3.5 not sure about compatibility with other 3.x versions*
```
python3 run.py
```

## Routes
```
/ - Serves the web application. Allowed methods; GET
/expense_report - Get the expense report grouped by month and employee. Allowed methods; GET
/parse - Parses an expense CSV, body should be a multi-part form data object with a 'file' parameter. Allowed methods; POST
```
