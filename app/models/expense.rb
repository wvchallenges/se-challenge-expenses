class Expense < ActiveRecord::Base
  belongs_to :category
  belongs_to :employee
  belongs_to :tax

  monetize :pre_tax_amount_cents
  monetize :tax_amount_cents

  validates :date, :category, :employee, :description, :pre_tax_amount, :tax, :tax_amount,
            presence: true

  delegate :name, to: :category, prefix: true
  delegate :name, to: :employee, prefix: true
  delegate :address, to: :employee, prefix: true
  delegate :name, to: :tax, prefix: true
end
