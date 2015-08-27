class ExpensesController < ApplicationController
	
	def show_by_month
		@months = Expense.all.order('transaction_date asc').group_by{ |e| e.transaction_date.beginning_of_month }
	end

end
