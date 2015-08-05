require 'date'

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

      parsedDate = Date.strptime(csvRow.values[0], '%m/%d/%Y')

      parsedPreTax = csvRow.values[5].gsub(",", "")
      parsedTax = csvRow.values[7].gsub(",", "")

      expense = Expense.new(
        date: parsedDate,
        category: csvRow.values[1],
        employee_name: csvRow.values[2],
        employee_address: csvRow.values[3],
        description: csvRow.values[4],
        pre_tax_amount: parsedPreTax,
        tax_name: csvRow.values[6],
        tax_amount: parsedTax

      )

      return expense
    end
end
