class ExpensesController < ApplicationController
  def index
    @expense_by_month = Expense.all.group_by{|e|e.date.beginning_of_month}.sort_by{|e2|e2[0]}.reverse
  end

  def upload_expenses
    rows_imported, rows_total, success_msg = Expense.import(params[:expense_file])
    
    if success_msg
      flash[:notice] = "File successfully uploaded. #{rows_imported}/#{rows_total} expenses were imported to the database."
    else
      flash[:error] = "There was an error importing the file, please try again."
    end
    
    redirect_to root_url 
  end
end
