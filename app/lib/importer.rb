class Importer
  def self.import!(rows)
    expenses = []

    begin
      ActiveRecord::Base.transaction do
        rows.each do |row|
          employee = Employee.find_or_create_by!(row[:employee])
          tax = Tax.find_or_create_by!(row[:tax])
          category = Category.find_or_create_by!(row[:category])

          expense_attributes = row[:expense].merge({
            category: category,
            tax: tax,
            employee: employee
          })
          expense = Expense.create!(expense_attributes)

          expenses << expense
        end
      end
    end

    expenses
  end
end
