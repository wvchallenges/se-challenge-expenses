class Employee < ApplicationRecord
	validates :employee_name, presence: true
	validates :employee_address, presence: true

	def name
		self.employee_name
	end
end
