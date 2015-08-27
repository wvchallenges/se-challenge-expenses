class ExpenseSheetParserController < ApplicationController
	require 'csv'

	def index
	end

	def import

		file = params[:file]
		CSV.foreach(file.path, headers: true) do |row|
			Employee.import(row)
			Tax.import(row)
		end

		redirect_to expenses_by_month_path
	end

end
