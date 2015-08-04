class Expense < ActiveRecord::Base
  belongs_to :expense_sheet
end
