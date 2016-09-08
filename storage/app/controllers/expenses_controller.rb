class ExpensesController < ApplicationController
  include ExpenseHelper

  def index
    @expense = Expense.new
    @expenses = display_data Expense.all
  end

  def create
    expenses = Expense.upload(params[:file])
    @grouped_expenses = display_data expenses
    respond_to do |format|
      format.js
    end
    #redirect_to root_url
  end

  private

  def group_and_sort(expenses)
    expenses.group_by{ |m| m.date_specified.beginning_of_month }.sort_by{|m, e| m}
  end

  def display_data(expenses)
    group_and_sort(expenses).collect{ |month, expenses|
      pre_tax = expenses.sum(&:pre_tax_amount)
      tax = expenses.sum(&:tax_amount)
      { id: month_as_id(month),
        month: month.strftime('%Y %B'),
        pre_tax: pre_tax.round(2),
        tax: tax.round(2),
        total: (pre_tax + tax).round(2)
        }}
  end
end