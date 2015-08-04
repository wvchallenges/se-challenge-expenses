class ExpenseSheet < ActiveRecord::Base
  has_many :expenses
end
