class Expense < ActiveRecord::Base

  def pre_tax_amount_dollars
    self.pre_tax_amount_cents.to_d / 100
  end

  def tax_amount_dollars
    self.tax_amount_cents.to_d / 100
  end

end
