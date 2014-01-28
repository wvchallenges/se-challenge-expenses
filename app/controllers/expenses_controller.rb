class ExpensesController < ApplicationController
  def index 
    grouped_expenses = Expense.where(id: session[:ids])
      .order(:date)
      .group("year(date)")
      .group("month(date)")

    expenses_by_pre_tax = grouped_expenses.sum("pre_tax")
    expenses_by_tax_amount = grouped_expenses.sum("tax_amount")

    @monthly_expenses = expenses_by_tax_amount.merge(expenses_by_pre_tax) do |key, tax, pre|
      pre + tax
    end

    render :index
    session[:ids] = []
  end

  def import
    session[:ids] = Expense.import(params[:file])
    redirect_to root_url
  end
end
