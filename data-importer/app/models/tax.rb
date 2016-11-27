class Tax < ApplicationRecord
	validates :tax_name, presence: true
	def name
    self.tax_name
  end
end
