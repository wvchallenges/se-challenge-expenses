require "spec_helper"

describe Expense do

	row = {:date=>"1/6/2014", :category=>"Computer - Hardware", :employee_name=>"Eric Schmidt", :employee_address=>"1600 Amphitheatre Parkway, Mountain View, CA 94043", :expense_description=>"iPhone", :"pre-tax_amount"=>200.0, :tax_name=>"CA Sales tax", :tax_amount=>15.0}

	after(:each) do
		Expense.import_row(row)
	end

	it "creates a new customer" do
		expect(Category).to receive(:find_or_create_by).with({name: row[:category]})
			.and_return(Category.new)
	end

	it "creates a new employee" do
		expect(Employee).to receive(:find_or_create_by).with({name: row[:employee_name], address: row[:employee_address]})
			.and_return(Employee.new)
	end

	it "creates a new expense" do
		expect(Expense).to receive(:create)
	end
end
