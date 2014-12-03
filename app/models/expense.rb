class Expense < ActiveRecord::Base
  attr_accessible :category, :date, :employee_name, :employee_address, :expense_description, :pre_tax_amount, :tax_amount, :tax_name

  def self.import(file)
    CSV.foreach(file.path,
                headers: true,
                converters: :all,
                header_converters: lambda {|h| h.downcase.gsub(/\s|-/, '_')},
              ) do |row|

    row["date"] = Date::strptime(row["date"], "%m/%d/%Y")
    row["pre_tax_amount"] = row["pre_tax_amount"].gsub(',', '').to_f if row["pre_tax_amount"].is_a?(String)
    row["tax_amount"] = row["tax_amount"].gsub(',', '').to_f if row["tax_amount"].is_a?(String)
    Expense.create! row.to_hash
    end
  end
end
