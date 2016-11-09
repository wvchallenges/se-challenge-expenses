class Expense < ActiveRecord::Base

require 'csv'

  def self.import(file)


    skip_headers = 1
    CSV.foreach(file.path, headers:["date", "category", "employee_name",
                 "employee_address", "expense_description",
                 "pre_tax_amount", "tax_name", "tax_amount"] ) do |row|
      
      # Do no grab the header line. Instead we will be using 
      # properly formed headers that correspond with our Expenses model
      if skip_headers > 0
        skip_headers -= 1
      else
        
        # Ensure our row to be added does not already exist
        # in the database. ASSUMPTION: An expense with the same date,
	# employee name, and pre-tax amnount constitutes the same expense
        # and will not be entered anew into the database
        if Expense.exists?( {:date => row[0], :employee_name => row[2], :pre_tax_amount => row[5]} ) == false
          Expense.create!(row.to_hash)
        end
      end
    end # end CSV.foreach
  end # end self.import(file)

end
