require 'date'

class ExpensesController < ApplicationController

  def index
    @total_per_month = {}
    expenses = Expense  .all
    expenses.each do |e|
      month = Date::MONTHNAMES[e.date.month]
      total = e.pre_tax_amount+e.tax_amount
      if @total_per_month.keys.include? month
        @total_per_month[month]+=total
      else
        @total_per_month[month]=total
      end
    end
  end

  def list
    @expenses = Expense.all
  end

  def import_file
    csv_file = params[:file]
    if csv_file
      Expense.import(csv_file)
      flash[:notice] = "CSV Uploaded Successfully"
      redirect_to root_path
    else
      flash[:error] = "Select a File to Import!"
    end
  end

  def delete_all_expenses
    if (Expense.destroy_all)
      flash[:notice] = "Expenses Deleted Successfully"
    else
      flash[:error] = "Falied to delete expenses"
    end
    redirect_to root_path
  end

end
