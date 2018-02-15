require 'csv'  

class ExpensesController < ApplicationController
  # GET /expenses
  # GET /expenses.json
  def index
    @expenses = Expense.all
  end

  def list
    @expense = Expense.find(params[:id])
  end

  def destroy
    Expense.destroy(params[:id])

    redirect_to action: "index"
  end

  def import_csv
    data = []
    total = 0

    CSV.foreach(params[:file].path, headers: true) do |row|
      data.push({
        :date => row['date'],
        :category => row['category'],
        :employee_name => row['employee name'],
        :employee_address => row['employee_address'],
        :expense_description => row['expense description'],
        :pre_tax_amount => row['pre-tax amount'],
        :tax_name => row['tax name'],
        :tax_amount => row['tax amount']
      })

      total += row['pre-tax amount'].to_f
    end

    Expense.create({
      :data => data,
      :total => total
    })

    # render :json => { :data => data, :total => total }

    redirect_to action: 'list', id: Expense.last
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def expense_params
      params.require(:expense).permit(:date, :category, :employee_name, :employee_address, :expense_description, :pre_tax_amount, :tax_name, :tax_amount)
    end
end
