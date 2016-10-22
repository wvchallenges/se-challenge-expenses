class Employee < ApplicationRecord

  def self.upload(file)
    CSV.foreach(file.path, headers: true) do |row|
      employee = new
      employee.attributes = {
        date: Date.strptime(row["date"], "%m/%d/%Y"),
        category: row["category"],
        name: row["employee name"],
        address: row["employee address"],
        expense_description: row["expense description"],
        pre_tax_amount: row["pre-tax amount"].to_f,
        tax_name: row["tax name"],
        tax_amount: row["tax amount"].to_f
      }

      employee.save!
    end
  end

  def self.total_expenses
    res = {}
    Employee.find_each do |employee|
      res[employee.date.beginning_of_month] ||= 0
      res[employee.date.beginning_of_month] += employee.post_tax_amount
    end
    res
  end

  def post_tax_amount
    pre_tax_amount + tax_amount
  end
end
