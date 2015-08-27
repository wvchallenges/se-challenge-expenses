class Tax < ActiveRecord::Base

	def self.import(row)
		tax_rate = ((row['tax amount']).to_f/(row['pre-tax amount']).to_f).round(5)
		self.create_with(rate: tax_rate).find_or_create_by(name: row['tax name'])
	end

	def multiply_rate
		1.0 + self.rate
	end

end
