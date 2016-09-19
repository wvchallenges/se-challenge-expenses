class Expense < ApplicationRecord
  belongs_to :category
  belongs_to :employee

  def self.from_csv row
    new \
      date: Date.strptime(row["date"], "%m/%d/%Y"),
      description: row["expense description"],
      pretax_amount: row["pre-tax amount"].gsub(",", "_"),
      tax_name: row["tax name"],
      tax_amount: row["tax amount"].gsub(",", "_")
  end
end
