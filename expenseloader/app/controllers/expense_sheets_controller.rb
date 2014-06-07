require 'csv'

class ExpenseSheetsController < ApplicationController
  def show
    @expense_sheet = ExpenseSheet.find(params[:id])
    @monthly_expenses = @expense_sheet.expenses.month_expenses
  end

  def new
    @expense_sheet = ExpenseSheet.new
  end

  def create
    @expense_sheet = ExpenseSheet.new(expense_sheet_params)
    if @expense_sheet.save
      @expense_sheet.parse_expense_file
      redirect_to @expense_sheet, notice: 'Expense Sheet was successfully uploaded and saved'
    else
      render :new
    end
  end

  private
  def expense_sheet_params
    params.require(:expense_sheet).permit(:expense_file)
  end
end
