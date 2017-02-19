class CsvFormController < ApplicationController
  require 'csv'

  def get
    render 'csv_form/get'
  end

  def upload
    parse_csv(params.require(:file))
    render 'csv_form/summary'
  end

  private

  def parse_csv(uploaded_file)
    fail 'Wrong file type' unless uploaded_file.content_type == 'text/csv'

    csv = CSV.parse(uploaded_file.tempfile, :headers => true)
    csv.each do |row|
      process_row(row)
    end
  end

  def process_row(row)
    employee = Employee.find_or_create_by!(name: row["employee name"], address: row["employee address"])
    category = Category.find_or_create_by!(name: row["category"])
    expense = Expense.find_or_create_by!(
      occurance_date: Date.strptime(row["date"],"%m/%d/%Y").to_time,
      description: row["expense description"],
      pre_tax_amount: row["pre-tax amount"].to_f,
      tax_amount: row["tax amount"].to_f,
      tax_type: row["tax name"],
      employee_id: employee.id,
      category_id: category.id
    )
  end
end
