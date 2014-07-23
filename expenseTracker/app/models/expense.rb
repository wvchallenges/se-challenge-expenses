class Expense < ActiveRecord::Base

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      hash = row.to_hash

      ## Normalize Data column names and data
      newHash = Hash.new
      newHash["date"] = Date::strptime(hash['date'], "%m/%d/%Y")
      newHash["category"] = hash["category"]
      newHash["employee_name"] = hash["employee name"]
      newHash["employee_addr"] = hash["employee address"]
      newHash["description"] = hash["expense description"]
      newHash["amount"] = hash["pre-tax amount"].to_d
      newHash["tax_type"] = hash["tax name"]
      newHash["tax"] = hash["tax amount"].to_d
      newHash["total_amount"] = (hash["pre-tax amount"].to_d + hash["tax amount"].to_d)

      Expense.create(newHash)
    end
  end

  def self.monthly_report
    expenses= Expense.all
    monthly_expense = Hash.new
    expenses.each do |expense|
      if monthly_expense.has_key?(expense.date.year) then
        if monthly_expense[expense.date.year].has_key?(expense.date.month) then
          monthly_expense[expense.date.year][expense.date.month] += expense.total_amount
        else
          monthly_expense[expense.date.year][expense.date.month] = 0
          monthly_expense[expense.date.year][expense.date.month] += expense.total_amount
        end
      else
        monthly_expense[expense.date.year] = Hash.new
        if monthly_expense[expense.date.year].has_key?(expense.date.month) then
          monthly_expense[expense.date.year][expense.date.month] += expense.total_amount
        else
          monthly_expense[expense.date.year][expense.date.month] = 0
          monthly_expense[expense.date.year][expense.date.month] += expense.total_amount
        end
      end
    end
    return monthly_expense
  end

end
