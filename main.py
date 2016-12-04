from bottle import Bottle, run
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import expense_app.expense_upload

app = Bottle()

Session = sessionmaker()
engine = create_engine('mysql+pymysql://root:@localhost/wave_db_dev')
Session.configure(bind=engine)
session = Session()

if __name__ == '__main__':
  app.merge(expense_app.expense_upload.app)
  run(app, host='localhost', port=8080)
