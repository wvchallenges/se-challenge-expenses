class EmployeeExpense < ActiveRecord::Base
  belongs_to :file_import
  attr_accessible :file_import_id, :date, :category, :employee_name, :employee_address,  :expense_description, :pre_tax_amount, :tax_name, :tax_amount
end
