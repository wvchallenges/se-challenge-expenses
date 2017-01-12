class ExpenseDocument < ApplicationRecord
  require 'csv'

  @expenses = []

  # parses csv and creates employee expenses
  # @param [File] :file The file containing expense information
  # @return [Hash<String, Array<EmployeeExpenses>>] :@expenses A collection of expenses grouped by month
  def self.import(file)
    csv_file = File.read(file.path)
    @expenses = []
    csv = CSV.parse(csv_file, :headers => true)

    csv.each do |row|
      @expenses << EmployeeExpense.create(
          :date           => DateTime.strptime(row['date'], '%m/%d/%Y'),
          :description    => row['expense description'],
          :pre_tax_amount => row['pre-tax amount'].to_f,
          :tax_amount     => row['tax amount'].to_f,
          :tax_name       => row['tax name'],
          :employee_id    => Employee.find_or_create_by(
              name: row['employee name'],
              address: row['employee address']).id,
          :expense_category_id => ExpenseCategory.find_or_create_by(:name => row['category']).id
      )
    end

    @expenses = @expenses.sort_by(&:date).group_by{ |expense| expense.date.beginning_of_month }
  end

  # accessor for collection of expenses
  def self.expenses
    @expenses
  end

end