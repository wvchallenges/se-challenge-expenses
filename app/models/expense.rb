class Expense < ActiveRecord::Base
  attr_accessible :category, :date, :employee_name, :expense_description, :pre_tax_amount, :tax_amount, :tax_name

  def self.import(file)
    CSV.foreach(file.path,
                headers: true,
                converters: :all,
                header_converters: lambda {|h| h.downcase.gsub(' ', '_')},
                return_headers: true
              ) do |row|
    Expense.create! row.to_hash
    end
  end
end
