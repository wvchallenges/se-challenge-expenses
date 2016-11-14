class Tax  < ActiveRecord::Base
	has_many :employee_expenses

	validates :name, presence: true, uniqueness: true
end