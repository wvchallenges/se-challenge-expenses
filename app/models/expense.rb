class Expense < ActiveRecord::Base
  belongs_to :category
  belongs_to :employee
  belongs_to :tax

  monetize :pre_tax_amount_cents
  monetize :tax_amount_cents

  validates_presence_of :date, :category, :employee, :description, :pre_tax_amount, :tax, :tax_amount

  def category_name
    category.name
  end

  def employee_name
    employee.name
  end

  def employee_address
    employee.address
  end

  def tax_name
    tax.name
  end
end
