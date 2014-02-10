class Employee < ActiveRecord::Base

  has_many :expenses

  def total_expenses
    expenses.sum(:pre_tax_amount_cents)
  end

end
