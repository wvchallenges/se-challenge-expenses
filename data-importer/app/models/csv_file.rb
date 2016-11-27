class CsvFile < ApplicationRecord
	has_attached_file :file, path: "#{Rails.root}/uploaded_files/:class/:attachment/:id_partition/:filename"
    has_many :expenses, dependent: :destroy

	validates_attachment :file, presence: true, :content_type => { content_type: 'text/csv' }

	before_save :parse_file

	def parse_file
		tempfile = file.queued_for_write[:original].read

        CSV.parse(tempfile, headers: true) do |row|
            employee = Employee.find_or_create_by!(employee_name: row['employee name'], employee_address: row['employee address']) # create if does not exist
            category = Category.find_or_create_by!(name: row['category'])
            tax = Tax.find_or_create_by!(tax_name: row['tax name'])

            Expense.create(
                    expense_description: row['expense description'],
                    pretax_amount: Monetize.parse(row['pre-tax amount']).cents,
                    tax_amount: Monetize.parse(row['tax amount']).cents,
                    date: Date.strptime(row['date'], "%m/%d/%Y"),
                    tax: tax,
                    category: category,
                    employee: employee,
                    csv_file: self
                )
        end
    end
end
