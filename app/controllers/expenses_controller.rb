class ExpensesController < ApplicationController
  def index
  	@expenses = expenses.group_by{|e| e.date.beginning_of_month}
  end

  def new
  	@expenses = Expense.new
  end

  def create
  	Expense.import(params[:file],current_user.id)
    redirect_to user_path(current_user), notice: "Expenses imported."
  end
end
