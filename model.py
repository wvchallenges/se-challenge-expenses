from datetime import datetime
from sqlalchemy import func, desc
from sqlalchemy import create_engine
from sqlalchemy import ForeignKey
from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

# creates a sqlite db in memory and populate schema
# returns [Session]
def init_db():
  engine = create_engine('sqlite:///:memory:', echo=False)
  Base.metadata.create_all(engine)
  Session = sessionmaker(bind=engine)
  return Session()

# retrieves or creates a specified model
def get_or_create(session, model, **kwargs):
  instance = session.query(model).filter_by(**kwargs).first()
  if instance:
    return instance
  else:
    instance = model(**kwargs)
    session.add(instance)
    return instance

# hardcoded monthly expenses query
def expense_breakdown_monthly(session):
  return session.query(
    Expense.transaction_month,
    Expense.transaction_year,
    func.sum(Expense.pre_tax_amount),
    func.sum(Expense.tax_amount),
  ).group_by(
    Expense.transaction_year,
    Expense.transaction_month,
  ).order_by(
    desc(Expense.transaction_year),
    desc(Expense.transaction_month),
  ).all()

class DefaultMixin(object):
  id = Column(
    Integer,
    primary_key=True,
    autoincrement=True,
    nullable=False)
  created_at = Column(
    DateTime,
    nullable=False,
    default=datetime.utcnow)
  modified_at = Column(
    DateTime,
    nullable=False,
    onupdate=datetime.utcnow,
    default=datetime.utcnow)

class Expense(DefaultMixin, Base):
  __tablename__ = 'expense'
  employee_id = Column(Integer, ForeignKey('employee.id'))
  date = Column(DateTime)
  description = Column(String)
  pre_tax_amount = Column(Float)
  tax_amount = Column(Float)
  tax_name = Column(String)
  category = Column(String)
  transaction_year = Column(Integer)
  transaction_month = Column(Integer)

class Employee(DefaultMixin, Base):
  __tablename__ = 'employee'
  expenses = relationship('Expense')
  full_name = Column(String(40))
  address = Column(String(100))

