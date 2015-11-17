class Expense < ActiveRecord::Base
  # id, integer, Primary Key, NOT NULL
  # employee_id, integer, Foreign Key, NOT NULL
  # category_id, integer, Foreign Key, NOT NULL
  # tax_id, integer, Foreign Key, NOT NULL
  # date, date, NOT NULL
  # description, string, NOT NULL
  # pre_tax_amount, float, NOT NULL
  # tax_amount, float, NOT NULL
  #
  # index: id
  # index: employee_id, category_id, tax_id

  belongs_to :employee
  belongs_to :category
  belongs_to :tax
end
