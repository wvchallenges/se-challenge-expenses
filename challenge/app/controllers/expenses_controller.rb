class ExpensesController < ApplicationController

  def import
    require 'csv'

    #I'm assuming the uploaded file represents the whole table
    Expense.delete_all

    @monthly_totals = {}

    CSV.foreach(params[:expense_file].path, headers: true) do |row|

      row = row.to_hash

      expense = Expense.create!(
        date: Date.strptime(row['date'], '%m/%d/%Y'),
        category: row['category'],
        employee_name: row['employee name'],
        employee_address: row['employee address'],
        description: row['expense description'],
        pre_tax_amount: row['pre-tax amount'].gsub(/,/, ''),
        tax_name: row['tax name'],
        tax_amount: row['tax amount'].gsub(/,/, '')
      )

      month = expense.date.beginning_of_month
      if @monthly_totals[month]
        @monthly_totals[month] = [
            @monthly_totals[month][0] + expense.pre_tax_amount,
            @monthly_totals[month][1] + expense.pre_tax_amount + expense.tax_amount
        ]
      else
        @monthly_totals[month] = [expense.pre_tax_amount, 
            expense.pre_tax_amount + expense.tax_amount ]
      end
    end

  end

end
