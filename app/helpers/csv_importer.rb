require 'fileutils'
require 'open-uri'
require 'csv'  

class CSVImporter
	attr_accessor :file_path, :file_name, :category_memo, :employee_memo, :tax_memo
	# public: Downloads and parses the document to populate the DB
  #
  # Examples
  #   => processor.parse
  #
  # Returns html_url when finished
  def initialize( document_path )
  	@file_path				= document_path
  	@category_memo 		= []
		@employee_memo 		= []
		@tax_memo					= []
  end

	def parse
		# Header:
		# date, category,
		# employee name, employee address, expense description,
		# pre-tax amount,tax name,tax amount

		# TODO: Download the uploaded file and use
		csv_text = File.read(file_path)
		csv = CSV.parse(csv_text, :headers => true)

		csv.each do |row|
			# Get DB appropriate values
			row['date'] = DateTime.strptime(row['date'], '%m/%d/%Y')
			row['category_id'] = get_category( row['category'] )
			row['employee_id'] = get_employee( row['employee name'], row['employee address'] )
			row['description'] = row['expense description']
			row['pre_tax_amount'] = BigDecimal.new row['pre-tax amount'].gsub(',','')
			row['tax_id'] = get_tax( row['tax name'] )
			row['tax_amount'] = BigDecimal.new row['tax amount'].gsub(',','')

			params = row.to_hash

			# Delete excess keys
			params.delete('category')
			params.delete('employee name')
			params.delete('employee address')
			params.delete('expense description')
			params.delete('pre-tax amount')
			params.delete('tax name')
			params.delete('tax amount')

		  EmployeeExpense.create!(params)
		end

	end

private

	def get_category( name )
		# Find in memo
		category = category_memo.find{|c| c[:name] == name}
		
		# Create and add to memo if not found
		unless category
			category = Category.create( :name => name )
			category = Category.where( :name => name ).first if category.id.nil?
			@category_memo.push( { :name => name, :id => category.id } )
			return category.id
		end

		# Return id
		category[:id]
	end

	def get_employee( name, address )
		# Find in memo
		employee = employee_memo.find{|e| e[:name] == name}
		
		# Create and add to memo if not found
		unless employee
			employee = Employee.create( :name => name, :address => address )
			employee = Employee.where( :name => name ).first if employee.id.nil?
			@employee_memo.push( { :name => name, :address => address, :id => employee.id } )
			return employee.id
		end

		# Return id
		employee[:id]
	end

	def get_tax( name )
		# Find in memo
		tax = tax_memo.find{|t| t[:name] == name}
		
		# Create and add to memo if not found
		unless tax
			tax = Tax.create( :name => name )
			tax = Tax.where( :name => name ).first if tax.id.nil?
			@tax_memo.push( { :name => name, :id => tax.id } )
			return tax.id
		end

		# Return id
		tax[:id]
	end

end