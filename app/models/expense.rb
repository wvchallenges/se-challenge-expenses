class Expense < ActiveRecord::Base
  attr_accessible :category, :date, :employee_name, :expense_description, :pre_tax_amount, :tax_amount, :tax_name
end
