class Expense < ApplicationRecord
  belongs_to :employee
  belongs_to :category
  belongs_to :tax

  validates_presence_of :pretax_amount, :tax_amount, :total_amount, :date
end
