import gevent
from gevent.wsgi import WSGIServer
from gevent.queue import Queue

from flask import Flask, Response, render_template

app = Flask(__name__, static_folder="web", static_url_path="", template_folder="web/html")

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.debug = True
    app.run(threaded=True)

    # server = WSGIServer(("", 5000), app)
    # server.serve_forever()
