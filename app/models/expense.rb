class Expense < ActiveRecord::Base
	belongs_to :employee, :inverse_of => :expenses

	def total 
		self.amount * (1.0 + (Tax.find_by(name: self.sales_tax).multiply_rate)).round(2)
	end
end
