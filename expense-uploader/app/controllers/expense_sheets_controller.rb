class ExpenseSheetsController < ApplicationController

  def new
    @sheet = ExpenseSheet.new
  end

end
