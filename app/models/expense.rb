class Expense < ActiveRecord::Base
  belongs_to :employee
  belongs_to :tax
  belongs_to :expense_category
end
