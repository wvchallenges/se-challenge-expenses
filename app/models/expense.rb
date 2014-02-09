class Expense < ActiveRecord::Base

  belongs_to :expense_sheet
  belongs_to :employee

  def self.monthly_totals_cents
    select("strftime('%m', date) as month, sum(pre_tax_amount_cents + tax_amount_cents) as total")
      .group("strftime('%m', date)")
  end

end
