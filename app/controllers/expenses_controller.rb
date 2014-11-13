class ExpensesController < ApplicationController
  def index
    @expenses = Expense.all
  end

  def show
  end

  def new
  end

  def create
  end

  def import
    Expense.import(params[:file])
    redirect_to root_url, notice: "Expenses imported."
  end
end
