require 'csv'

module CsvImporter

  class << self
    def process import
      CSV.foreach(import.uploaded_file, headers: :first_row) do |row|
        expense = Expense.from_csv(row).tap do |exp|
          exp.category = Category.from_csv row
          exp.employee = Employee.from_csv row
        end
        import.expenses << expense
      end
    end
  end
end
