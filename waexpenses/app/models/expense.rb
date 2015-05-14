
class Expense < ActiveRecord::Base

  monetize :amount_cents, :numericality => { :greater_than => 0 }

  validates :amount, :presence => true
  validates :amount, :numericality => {greater_than: 0}

  belongs_to :employee
  belongs_to :category
  has_and_belongs_to_many :taxes
  has_many :tax_amounts
end