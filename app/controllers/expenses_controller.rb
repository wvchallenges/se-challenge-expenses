class ExpensesController < ApplicationController

  def index
    @expenses = Expense.order('date desc').page(params[:page])
  end

end
