class EmployeeExpensesController < ApplicationController
	include ActionController::Live

	def index
		@employee_expense_groups = EmployeeExpense.all
			.order(:date) # Order rows
			.includes(:category,:employee,:tax) # Preload associations in one query
			.group_by { |expense| # Group by month
		  	expense.date.beginning_of_month
			}
	end

end