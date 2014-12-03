class ExpenseController < ApplicationController
  def index
  end

  def import
    Expense.import(params[:file])
    redirect_to expense_monthly_path, notice: "CSV Uploaded Successfully"
  end

  def monthly
    @expenses =
    Expense.select("strftime('%m/%Y', date) as month_year, round(sum(pre_tax_amount + tax_amount), 2) as total_expense").
    group("month_year")
  end
end
