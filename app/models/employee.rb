class Employee  < ActiveRecord::Base
	has_many :employee_expenses

	validates :name, presence: true, uniqueness: true
	validates :address, presence: true
end