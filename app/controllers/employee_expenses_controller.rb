class EmployeeExpensesController < ApplicationController

  def index
    @expenses = ExpenseDocument.expenses
  end

end
