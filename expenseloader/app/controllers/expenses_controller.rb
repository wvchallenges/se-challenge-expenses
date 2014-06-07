class ExpensesController < ApplicationController
  def index
    @monthly_expenses = Expense.month_expenses
  end
end
