class ExpensesController < ApplicationController

  def index
    @expenses = Expense.all
    @monthly_expense = Expense.monthly_report
    @total = Expense.sum(:total_amount)
  end

  def upload_csv
    begin
      Expense.import(params[:file])
      redirect_to root_url, notice: "Products imported."
    rescue => exception
      puts exception.backtrace
      redirect_to root_url, notice: "Invalid CSV file format."
    end
  end

end
