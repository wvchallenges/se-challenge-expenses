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
    # TODO: Wrap in transaction
    employee = Employee.find_or_create_by!(name: row["employee name"], address: row["employee address"])
    category = Category.find_or_create_by!(name: row["category"])
    expense = Expense.create!(
      # This date parsing is fragile
      occurance_date: Date.strptime(row["date"],"%m/%d/%Y").to_time,
      description: row["expense description"],
      pre_tax_amount: convert_currency_to_number(row["pre-tax amount"]),
      tax_amount: convert_currency_to_number(row["tax amount"]),
      tax_type: row["tax name"],
      employee_id: employee.id,
      category_id: category.id
    )
  end

  # http://stackoverflow.com/questions/24173237/currency-to-number-conversion-rails
  def convert_currency_to_number(currency)
    currency.to_s.gsub(/[$,]/,'').to_f
  end
end
