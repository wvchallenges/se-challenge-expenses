class ExpenseController < ApplicationController
  def index
  end

  def import
    Expense.import(params[:file])
    redirect_to expense_monthly_path, notice: "CSV Uploaded Successfully"
  end

  def monthly
    @expenses = Expense.per_month
  end
end
