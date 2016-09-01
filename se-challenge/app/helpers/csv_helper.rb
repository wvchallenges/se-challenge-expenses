require 'CSV'

module CsvHelper
	def self.csv_to_hash(csv_text)
		first_line_removed = csv_text.lines.to_a[1..-1].join
		array_of_arrays = CSV.parse(first_line_removed)

		result = []
		array_of_arrays.each do |array|
			expense = Hash.new
			expense[:date] = array[0]
			expense[:category] = array[1]
			expense[:employee_name] = array[2]
			expense[:employee_address] = array[3]
			expense[:expense_description] = array[4]
			expense[:pretax_amount] = array[5].gsub(',', '').to_f
			expense[:tax_name] = array[6]
			expense[:tax_amount] = array[7].gsub(',', '').to_f
			result.push(expense)
		end

		result
	end
end