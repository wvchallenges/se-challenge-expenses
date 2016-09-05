class Expense < ActiveRecord::Base
  belongs_to :category
  belongs_to :employee
  belongs_to :tax

  monetize :pre_tax_amount_cents
  monetize :tax_amount_cents
end
