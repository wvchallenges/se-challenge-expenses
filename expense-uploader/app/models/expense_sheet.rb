class ExpenseSheet < ActiveRecord::Base
  has_many :expenses

  #def initialize (dateUploaded)
  #  date_uploaded = dateUploaded
  #end

  public
    def loadFromCsv(dateUploaded, csvFile)

      self.date_uploaded = dateUploaded

      csvFile.rows.each do |row|
        expense = createExpenseFromCsvRow(row)

        expenses.push(expense)
      end

    end

  private

    def createExpenseFromCsvRow(csvRow)



      expense = Expense.new(
        date: csvRow.values[0],
        category: csvRow.values[1],
        employee_name: csvRow.values[2],
        employee_address: csvRow.values[3],
        description: csvRow.values[4],
        tax_name: csvRow.values[5],
        pre_tax_amount: csvRow.values[6],
        tax_amount: csvRow.values[7]

      )

      return expense
    end
end
