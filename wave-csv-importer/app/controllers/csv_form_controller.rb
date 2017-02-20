class CsvFormController < ApplicationController
  require 'csv'

  def get
    render 'csv_form/get'
  end

  def upload
    parse_csv(params.require(:file))
    render 'csv_form/summary'
  # rescue all errors and send the user to an error page.
  # Ideally would handle errors more specifically
  rescue
    render 'csv_form/error'
  end

  private

  # Given a file, will verify the file is of type csv and attempt to import
  # its data to the db
  def parse_csv(uploaded_file)
    fail unless uploaded_file.content_type == 'text/csv'

    csv = CSV.parse(uploaded_file.tempfile, :headers => true)
    csv.each do |row|
      process_row(row)
    end
  end

  # Given a row, will attempt to extract the User, Category, and Expense data
  # from that row. If any creation fails, the import is aborted and the db is
  # rolled back.
  # TODO: Currently this creates many db connections, 3 for every row. This
  # should be extracted out and a bulk_insert of the Users, Categories, and
  # Expenses should be done instead.
  def process_row(row)
    # Wrap in transaction to roll back the import if there are data errors
    ActiveRecord::Base.transaction do
      employee = Employee.find_or_create_by!(name: row["employee name"], address: row["employee address"])
      category = Category.find_or_create_by!(name: row["category"])
      expense = Expense.create!(
        # This date parsing is fragile, and relies on a set format
        occurance_date: Date.strptime(row["date"],"%m/%d/%Y").to_time,
        description: row["expense description"],
        pre_tax_amount: convert_currency_to_number(row["pre-tax amount"]),
        tax_amount: convert_currency_to_number(row["tax amount"]),
        tax_type: row["tax name"],
        employee_id: employee.id,
        category_id: category.id
      )
    end
  end

  # http://stackoverflow.com/questions/24173237/currency-to-number-conversion-rails
  # Handle special characters that can occur in a stringified currency amount
  def convert_currency_to_number(currency)
    currency.to_s.gsub(/[$,]/,'').to_f
  end
end
