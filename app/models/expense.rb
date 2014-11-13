class Expense < ActiveRecord::Base
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      mappings = { "employee name" => "employee_name",
                   "employee address" => "employee_address",
                   "pre-tax amount" => "pre_tax_amount",
                   "expense description" => "expense_description",
                   "tax name" => "tax_name",
                   "tax amount" => "tax_amount" }

      line = row.to_hash

      # maps headers to db column names
      line.keys.each { |k| line[ mappings[k] ] = line.delete(k) if mappings[k] }

      # converts date from MM/DD/YYYY to YYYY/MM/DD
      date = line["date"] .split('/')
      reformatted_date = "#{date[2]}/#{date[0]}/#{date[1]}"
      line["date"] = reformatted_date

      #strips commas from amounts allowing effective import
      line["pre_tax_amount"] = line["pre_tax_amount"].delete(',')
      line["tax_amount"] = line["tax_amount"].delete(',')

      Expense.create! line
    end
  end
end
