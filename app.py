import csv
import io
import sqlite3
from contextlib import closing
from flask import Flask, Response, request, render_template

# import gevent
# from gevent.wsgi import WSGIServer
# from gevent.queue import Queue

app = Flask(__name__, static_folder="web", static_url_path="", template_folder="web/html")
app.config.from_object('config')

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/parse", methods=["POST"])
def parse_csv():
    for row in csv.reader(io.StringIO(request.files["file"].read().decode("UTF8"), newline=None)):
        print(', '.join(row))

    return ""

if __name__ == "__main__":
    app.run(threaded=True)

    # server = WSGIServer(("", 5000), app)
    # server.serve_forever()
