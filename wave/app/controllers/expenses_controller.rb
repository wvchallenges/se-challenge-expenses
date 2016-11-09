class ExpensesController < ApplicationController

  require 'csv'

  before_action :set_expense, only: [:show]

  def index
    @expenses = Expense.order(date: :desc)
  end

  def get_expenses
    @list = Expense.order(date: :desc)
     respond_to do |format|
      format.json { render json: @list }
    end
  end

  def upload
    file = Expense.upload params[:csv]
    if (file != false)
    redirect_to root_url, notice: "File uploaded successfully"
    else
      redirect_to root_url, notice: "File not uploaded successfully."
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expense_params
      params.require(:expense).permit(:date, :employee_id, :category, :description, :amount, :tax_name, :tax_amount)
    end
end
