require "csv"

class CsvParser
  attr_reader :raw_csv

  def initialize(raw_csv)
    @raw_csv = raw_csv
  end

  def employee(csv_row)
    Employee.find_or_create_by(name: csv_row["employee name"]) do |employee|
      employee.update_attribute(:address, csv_row["employee address"])
    end
  end

  def expense_category(category_name)
    ExpenseCategory.find_or_create_by(name: category_name)
  end

  def expense_data(csv_row)
    {
      description: csv_row["expense description"],
      employee: employee(csv_row),
      expense_category: expense_category(csv_row["category"]),
      expensed_on: expensed_on(csv_row["date"]),
      pre_tax_amount: parse_number(csv_row["pre-tax amount"]),
      tax: tax(csv_row["tax name"]),
      tax_amount: parse_number(csv_row["tax amount"])
    }
  end

  def expensed_on(date)
    Time.strptime(date, "%m/%d/%Y")
  end

  def parse_number(value)
    delimiter = I18n::t("number.format.delimiter")
    value.delete(delimiter).to_f
  end

  def run
    CSV.parse(raw_csv, headers: true) do |row|
      Expense.create(expense_data(row))
    end
  end

  def tax(tax_name)
    Tax.find_or_create_by(name: tax_name)
  end
end
