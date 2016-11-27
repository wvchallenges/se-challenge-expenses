class Expense < ApplicationRecord
  validates :tax, presence: true
	validates :category, presence: true
	validates :employee, presence: true
	validates :pretax_amount, presence: true
	validates :tax_amount, presence: true
	validates :date, presence: true

  belongs_to :tax
  belongs_to :category
  belongs_to :employee
  belongs_to :csv_file
end
