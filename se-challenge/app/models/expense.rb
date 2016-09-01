class Expense < ApplicationRecord
	def self.month_totals(array_of_expenses) 
		totals = {}
		array_of_expenses.each do |expense|
			month_year = Date.strptime(expense[:date], '%m/%d/%Y').month.to_s + "/" + Date.strptime(expense[:date], '%m/%d/%Y').year.to_s
			if totals[month_year].nil?
				totals[month_year] = expense[:pretax_amount] + expense[:tax_amount]
			else
				totals[month_year] = totals[month_year] + expense[:pretax_amount] + expense[:tax_amount]
			end
		end
		totals
	end
end
