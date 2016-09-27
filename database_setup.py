import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

class Expense(Base):
    __tablename__ = 'expense'

    id = Column(Integer,  primary_key=True)
    date = Column(Date,  nullable=False)
    category = Column(String(250), nullable=False)
    employee = Column('employee', Integer, ForeignKey("employee.p_id"), nullable=False)
    description = Column(String(250), nullable=False)
    pre_tax = Column(Numeric(10, 2), nullable=False)
    tax_name = Column(String(250), nullable=False)
    tax_amount = Column(Numeric(10, 2), nullable=False)

class Employee(Base):
    __tablename__ = 'employee'

    p_id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    address = Column(String(250), nullable=False)


engine = create_engine('postgresql://vagrant:kexin@localhost/company')
Base.metadata.create_all(engine)
