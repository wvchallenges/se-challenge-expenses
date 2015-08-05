class PortfolioField < ActiveRecord::Base
	belongs_to :financial_portfolio
	before_save :unqoute_address, on: :create

	private
	def unqoute_address
		self.employee_address = self.employee_address.gsub(/^"|"$/, '')
	end
end
