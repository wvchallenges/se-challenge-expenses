class EmployeeExpense < ActiveRecord::Base
  attr_accessible :date, :category, :employee_name, :employee_address,  :expense_description, :pre_tax_amount, :tax_name, :tax_amount
end
