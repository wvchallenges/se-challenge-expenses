import csv
import io
import sqlite3
from datetime import datetime, date, time
from flask import Blueprint, Response, request, render_template, jsonify, redirect
from . import db_utils

mod = Blueprint("csv_parser", __name__, static_folder="web", static_url_path="", template_folder="web/html")

@mod.route("/")
def index():
    # Check to see if there's records in the table
    load_data = False
    with db_utils.connect_db() as db:
        load_data = db.cursor().execute(db_utils.num_of_expenses).fetchone()[0] > 0

    # Exclude some things from index if they're superfluous
    return render_template("index.html", load_data=load_data)

@mod.route("/expense_report", methods=["GET"])
def report():
    result = {
        "expenses_by_month": {
            "title": "By Month",
            "xAxis": "month",
        },
        "expenses_by_employee": {
            "title": "By Employee",
            "xAxis": "employee",
        },
    }
    with db_utils.connect_db() as db:
        cur = db.cursor()

        by_month = cur.execute(db_utils.expenses_by_month).fetchall()
        result["expenses_by_month"]["data"] = [{
            "month": row["month"],
            "total": row["total"]
        } for row in by_month]

        by_employee = cur.execute(db_utils.expenses_by_employee).fetchall()
        result["expenses_by_employee"]["data"] = [{
            "employee": row["employee_name"],
            "total": row["total"]
        } for row in by_employee]

    return jsonify(result)


@mod.route("/parse", methods=["POST"])
def parse_csv():
    # Generator expression for each row in the CSV
    def expense_parser(reader):
        for row in reader:
            yield (
                db_utils.convert_datetime(row["date"]),
                row['category'],
                row['employee name'],
                row['employee address'],
                row['expense description'],
                row['tax name'],
                db_utils.money_convert(row["pre-tax amount"]),
                db_utils.money_convert(row["tax amount"]),
            )

    # Have to wrangle the file into a File object for DictReader
    reader = csv.DictReader(io.StringIO(request.files["file"].read().decode("UTF8"), newline=None))

    # Insert all the rows into the db
    with db_utils.connect_db() as db:
        db.cursor().executemany(db_utils.insert_expense, expense_parser(reader))

    return redirect("/expense_report")
