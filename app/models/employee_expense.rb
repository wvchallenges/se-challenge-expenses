class EmployeeExpense  < ActiveRecord::Base
	belongs_to :employee
	belongs_to :category
	belongs_to :tax

	validates :date, presence: true
	validates :category, presence: true
	validates :employee, presence: true
	validates :tax, presence: true
	validates :description, presence: true
	validates :pre_tax_amount, presence: true
	validates :tax_amount, presence: true

	after_create_commit { EmployeeExpenseRelayJob.perform_later(self) }
end