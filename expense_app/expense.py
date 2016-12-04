from sqlalchemy import Column, Date, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Expense(Base):
  __tablename__ = 'expense'

  id = Column(Integer, primary_key=True)
  date = Column(Date)
  category = Column(String(50))
  employee_name = Column(String(50))
  employee_address = Column(String(50))
  expense_description = Column(String(50))
  pre_tax_amount = Column(Float)
  tax_name = Column(String(50))
  tax_amount = Column(Float)

  def __init__(self, date, category, employee_name, employee_address, expense_description,
    pre_tax_amount, tax_name, tax_amount):
      self.date = date
      self.category = category
      self.employee_name = employee_name
      self.employee_address = employee_address
      self.expense_description = expense_description
      self.pre_tax_amount = pre_tax_amount
      self.tax_name = tax_name
      self.tax_amount = tax_amount
