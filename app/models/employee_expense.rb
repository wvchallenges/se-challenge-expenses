class EmployeeExpense < ApplicationRecord
  belongs_to :employee
  belongs_to :expense_category

  validates_presence_of :date, :description, :pre_tax_amount, :tax_amount, :tax_name, :employee_id, :expense_category_id
end
