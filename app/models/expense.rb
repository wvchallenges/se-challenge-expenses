class Expense < ActiveRecord::Base
  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      mappings = { "employee name" => "employee_name",
                   "employee address" => "employee_address",
                   "pre-tax amount" => "pre_tax_amount",
                   "expense description" => "expense_description",
                   "tax name" => "tax_name",
                   "tax amount" => "tax_amount" }
      header = row.to_hash

      header.keys.each { |k| header[ mappings[k] ] = header.delete(k) if mappings[k] }

      Expense.create! header
    end
  end
end
