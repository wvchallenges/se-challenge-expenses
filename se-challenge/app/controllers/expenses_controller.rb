class ExpensesController < ApplicationController
	def index
		@expense = Expense.new
		@expense_totals = []
	end

	def create
		array_of_expenses = CsvHelper.csv_to_hash(params[:expense][:csv_file].read)

		@expense_totals = Expense.month_totals(array_of_expenses)

		array_of_expenses.each do |expense|
			puts expense
			# Expense.create(expense)
		end

		@expense = Expense.new
		render :index
	end

	private
	def expense_params
		params.require(:expense).permit(:date, :category, :employee_name, :employee_address,
			:employee_description, :pretax_amount, :tax_name, :tax_amount)
	end
end
