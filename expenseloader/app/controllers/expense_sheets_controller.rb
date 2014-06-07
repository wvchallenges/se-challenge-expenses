require 'csv'

class ExpenseSheetsController < ApplicationController
  def new
    @expense_sheet = ExpenseSheet.new
  end

  def create
    expense_sheet = ExpenseSheet.new(expense_sheet_params)
    expense_sheet.parse_expense_file
    redirect_to new_expense_sheet_path, notice: 'Expense Sheet was successfully uploaded and parsed'
  end

  private
  def expense_sheet_params
    params.require(:expense_sheet).permit(:expense_file)
  end
end
