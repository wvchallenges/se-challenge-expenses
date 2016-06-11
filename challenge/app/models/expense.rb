class Expense < ActiveRecord::Base
  validates :date, :category, :employee_name, :employee_address, :description,
      :pre_tax_amount, :tax_name, :tax_amount, presence: true

  def amount
    pre_tax_amount + tax_amount
  end

end
