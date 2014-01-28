class ExpensesController < ApplicationController
	def index
	end

	def import
		Expense.import(params[:file])
		redirect_to root_url, notice: "Expenses imported."
	end
end
