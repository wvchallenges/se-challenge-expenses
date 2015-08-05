module Utility
  class CsvExpenseSheetFactory

    public

      # Creates a new ExpenseSheet and populates its
      # expenses all using a  CsVFile object containing the data
      #
      # dateUploaded : the date the file was uploaded
      # cscFile : The CsvFile object containing the expenses
      def createSheetFromCsv(dateUploaded, csvFile)

        model = ExpenseSheet.new
        model.date_uploaded = dateUploaded

        csvFile.rows.each do |row|
          expense = createExpenseFromCsvRow(row)

          model.expenses.push(expense)
        end

        return model
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
end
