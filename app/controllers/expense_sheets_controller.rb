require 'csv'

class ExpenseSheetsController < ApplicationController

  def index
    @expense_sheets = ExpenseSheet.all
  end

  def show
    @expense_sheet = ExpenseSheet.find(params[:id])
  rescue AoctiveRecord::RecordNotFound
    flash[:error] = 'Expense sheet not found'
    redirect_to expense_sheets_path
  end

  def upload
    new_sheet = ExpenseSheet.create!

    file_data = params[:file].read
    csv_rows = CSV.new(file_data, headers: true, header_converters: :symbol)
    csv_hashes = csv_rows.to_a.map {|row| row.to_hash }

    csv_hashes.each do |row|
      Expense.create!({
          date: Date.strptime(row[:date], '%m/%d/%Y'),
          category: row[:category],
          employee_name: row[:employee_name],
          employee_address: row[:employee_address],
          expense_description: row[:expense_description],
          pre_tax_amount_cents: row[:pretax_amount].to_d * 100,
          tax_name: row[:tax_name],
          tax_amount_cents: row[:tax_amount].to_d * 100,
          expense_sheet: new_sheet
        })
    end

    respond_to do |format|
      format.html {
        redirect_to expense_sheets_path,
        notice: "Expense sheet uploaded"
      }
    end
  end

  def new
  end

end
