class Expense < ActiveRecord::Base

require 'csv'

  def self.import(file)


    skip_headers = 1
    CSV.foreach(file.path) do |row|
      
      # Do no grab the header line. Instead we will be using 
      # properly formed headers that correspond with our Expenses model
      if skip_headers > 0
        skip_headers -= 1
      else
        
        # Concatenating the employee address
        row[3] = row[3] + ',' + row[4] + ',' + row[5]
        
        # Creating the new row to be added
        # This row has the correct amount of fields
        newRow = CSV::Row.new(["date", "category", "employee_name", 
                 "employee_address", "expense_description", 
                 "pre_tax_amount", "tax_name", "tax_amount"], 
                  [row[0], row[1], row[2], row[3], row[6], 
                  row[7], row[8], row[9]], false)
        
        # Ensure our row to be added does not already exist
        # in the database. ASSUMPTION: An expense with the same date,
	# employee name, and pre-tax amnount constitutes the same expense
        # and will not be entered anew into the database
        if Expense.exists?( {:date => newRow[0], :employee_name => newRow[2], :pre_tax_amount => newRow[5]} ) == false
          Expense.create!(newRow.to_hash)
        end
      end
    end # end CSV.foreach
  end # end self.import(file)

end
