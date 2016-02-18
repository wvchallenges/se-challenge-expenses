from flask import Flask
from .handlers import mod as csv_parser_module
from .db_utils import connect_db

app = Flask(__name__)
app.config.from_object('config')
app.register_blueprint(csv_parser_module)

# Initialize the database schema on startup, currently wipes it on startup
with app.app_context():
    with connect_db() as db, app.open_resource('schema.sql', mode='r') as f:
        print("Initializing db")
        db.cursor().executescript(f.read())
