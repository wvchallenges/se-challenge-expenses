class Expense < ActiveRecord::Base
  belongs_to :category
  belongs_to :employee
  belongs_to :tax
end
