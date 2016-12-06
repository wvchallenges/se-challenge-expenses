class ExpensesController < ApplicationController
  def index
    @expenses_by_month = Expense.all_by_month
  end

  def upload
    Expense.delete_all

    CsvParser.new(params[:uploaded_expenses].read).run

    redirect_to expenses_path
  end
end
