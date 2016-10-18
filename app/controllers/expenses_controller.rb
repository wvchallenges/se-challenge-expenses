class ExpensesController < ApplicationController

  def index
    @expenses = Expense.all
  end

  def import_file
    csv_file = params[:file]
    if csv_file
      Expense.import(csv_file)
      flash[:notice] = "CSV Uploaded Successfully"
      redirect_to root_path
    else
      flash[:error] = "Select a File to Import!"
    end
  end

end
