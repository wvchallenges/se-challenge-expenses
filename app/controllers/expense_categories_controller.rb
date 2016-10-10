class ExpenseCategoriesController < ApplicationController
  def index
    @expense_categories = ExpenseCategory.all
  end
end
