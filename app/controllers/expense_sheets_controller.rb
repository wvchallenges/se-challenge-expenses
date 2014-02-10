class ExpenseSheetsController < ApplicationController

  def splash
  end

  def index
    @expense_sheets = ExpenseSheet.all
  end

  def show
    @expense_sheet = ExpenseSheet.find(params[:id])
    @monthly = @expense_sheet.expenses.monthly_totals_cents
  rescue ActiveRecord::RecordNotFound
    flash[:error] = 'Expense sheet not found'
    redirect_to expense_sheets_path
  end

  def upload
    @new_sheet = ExpenseSheet.import_csv_file!(params[:file])
    flash[:success] = 'Expense sheet uploaded'
    redirect_to expense_sheet_path(@new_sheet)
  end

  def new
  end

end
