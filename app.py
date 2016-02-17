import csv
import io
import sqlite3
from datetime import datetime, date, time
from flask import Flask, Response, request, render_template, jsonify, redirect

# import gevent
# from gevent.wsgi import WSGIServer
# from gevent.queue import Queue

app = Flask(__name__, static_folder="web", static_url_path="", template_folder="web/html")
app.config.from_object('config')

def connect_db():
    conn = sqlite3.connect(app.config['DATABASE'], detect_types=sqlite3.PARSE_DECLTYPES)
    conn.row_factory = sqlite3.Row
    return conn

def convert_datetime(date):
    return datetime.strptime(date, "%m/%d/%Y").date().strftime('%Y-%m-%d')

@app.route("/")
def index():
    load_data = False
    with connect_db() as db:
        load_data = db.cursor().execute("select count(*) from expenses").fetchone()[0] > 0
    return render_template("index.html", load_data=load_data)

@app.route("/expense_report", methods=["GET"])
def report():
    expenses_by_month = """
        select strftime('%Y-%m', expense_date) as month, sum(pretax_amount) + sum(tax_amount) as total
        from expenses
        group by month
        order by month asc
    """
    expenses_by_employee = """
        select employee_name, sum(pretax_amount) + sum(tax_amount) as total
        from expenses
        group by employee_name
        order by total desc
        limit 20
    """

    result = {
        "expenses_by_month": {
            "title": "By Month",
        },
        "expenses_by_employee": {
            "title": "By Employee",
        },
    }
    with connect_db() as db:
        cur = db.cursor()

        by_month = cur.execute(expenses_by_month).fetchall()
        result["expenses_by_month"]["data"] = [{
            "month": row["month"],
            "total": row["total"]
        } for row in by_month]

        by_employee = cur.execute(expenses_by_employee).fetchall()
        result["expenses_by_employee"]["data"] = [{
            "employee": row["employee_name"],
            "total": row["total"]
        } for row in by_employee]

    return jsonify(result)


@app.route("/parse", methods=["POST"])
def parse_csv():
    def expense_parser(reader):
        money_convert = lambda string: int(float(string.replace(",", "")) * 100)

        for row in reader:
            yield (
                convert_datetime(row["date"]),
                row['category'],
                row['employee name'],
                row['employee address'],
                row['expense description'],
                row['tax name'],
                money_convert(row["pre-tax amount"]),
                money_convert(row["tax amount"]),
            )

    reader = csv.DictReader(io.StringIO(request.files["file"].read().decode("UTF8"), newline=None))

    with connect_db() as db:
        db.cursor().executemany("""insert into expenses
            (expense_date, category, employee_name, employee_address, expense_description, tax_name, pretax_amount, tax_amount)
            values (?, ?, ?, ?, ?, ?, ?, ?)""", expense_parser(reader))

    return redirect("/expense_report")

with app.app_context():
    with connect_db() as db, app.open_resource('schema.sql', mode='r') as f:
        print("Initializing db")
        db.cursor().executescript(f.read())

if __name__ == "__main__":
    app.run(threaded=True)
    # server = WSGIServer(("", 5000), app)
    # server.serve_forever()
