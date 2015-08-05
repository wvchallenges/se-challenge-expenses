require 'csv'

class PortfolioReader
	def self.parse(csv_text)
		result = []

		CSV.parse(csv_text, headers: true) do |row|
			attrs = map_attributes(row.to_hash)
			result.push(attrs)
		end

		result
	end

	private

	def self.map_attributes(hash)
		underscored_hash = {}

		hash.each do |k, v|
			underscored_key = k.gsub(/[ -]/, '_')
			underscored_hash[underscored_key] = v
		end

		date = underscored_hash["date"]
		pre_tax = underscored_hash["pre_tax_amount"]
		tax = underscored_hash["tax_amount"]

		underscored_hash["date"] = Date.strptime(date, "%m/%d/%Y")
		underscored_hash["pre_tax_amount"] = pre_tax.gsub(/,/, "")
		underscored_hash["tax_amount"] = tax.gsub(/,/, "")

		underscored_hash
	end
end
