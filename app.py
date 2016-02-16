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
    def expense_parser(reader):
        money_convert = lambda string: int(float(string.replace(",", "")) * 100)

        for row in reader:
            yield (
                row['date'],
                row['category'],
                row['employee name'],
                row['employee address'],
                row['expense description'],
                row['tax name'],
                money_convert(row["pre-tax amount"]),
                money_convert(row["tax amount"]),
            )

    reader = csv.DictReader(io.StringIO(request.files["file"].read().decode("UTF8"), newline=None))
    print(reader.fieldnames)

    with connect_db() as db:
        db.executemany("""insert into expenses ('date', category, employee_name, employee_address, expense_description, tax_name, pretax_amount, tax_amount)
            values (?, ?, ?, ?, ?, ?, ?, ?)""", expense_parser(reader))
        db.commit()

    return ""

with app.app_context(), connect_db() as db:
    print("Initializing")
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

if __name__ == "__main__":
    app.run(threaded=True)
    # server = WSGIServer(("", 5000), app)
    # server.serve_forever()
