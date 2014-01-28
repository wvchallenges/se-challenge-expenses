class ExpensesController < ApplicationController
  def index 
    @expenses = Expense.where(id: session[:ids])
    render :index
    session[:ids] = []
  end

  def import
    session[:ids] = Expense.import(params[:file])
    redirect_to root_url
  end
end
