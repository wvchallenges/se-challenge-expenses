require 'spec_helper'

describe ExpenseSheet do
  let(:line) { ["12/1/2013", "Travel", "Don Draper", "783 Park Ave, New York, NY 10021", "Taxi ride", " 350.00 ", "NY Sales tax", " 31.06 "] }
  let(:expense_sheet) { ExpenseSheet.new }

  it 'should create an employee with the name filled in' do
    employee = expense_sheet.employee(line)
    expect(employee.name).to eq('Don Draper')
  end

  it 'should create an employee with the address properly filled in' do
    employee = expense_sheet.employee(line)
    expect(employee.address).to eq('783 Park Ave')
  end

  it 'should retrieve employee if they exist already' do
    second_line = ["10/12/2013", "Computer - Hardware", "Don Draper", "783 Park Ave, New York, NY 10021", "Macbook Air", " 1,999.00 ", "NY Sales tax", " 177.41 "]
    employee1 = expense_sheet.employee(line)
    employee2 = expense_sheet.employee(second_line)

    expect(employee1).to eq(employee2)
  end

  it 'should create a category' do
    category = expense_sheet.category(line)
    expect(category.name).to eq('Travel')
  end

  it 'should retrieve category if one already exists' do
    category = expense_sheet.category(line)
    category2 = expense_sheet.category(line)

    expect(category).to eq(category2)
  end

  it 'should create an expense' do
    expense = expense_sheet.expense(line)
    expect(expense.purchase_date).to eq(Date.new(2013, 01, 12))
    expect(expense.description).to eq('Taxi ride')
    expect(expense.pre_tax_amount).to eq(350)
  end

  it 'should associate all models together correctly' do
    expense_sheet.create_models(line)

    expect(Employee.first.expenses.count).to eq(1)
  end
end

=begin
[
    ["date", "category", "employee name", "employee address", "expense description", "pre-tax amount", "tax name", "tax amount"],
    ["12/1/2013", "Travel", "Don Draper", "783 Park Ave, New York, NY 10021", "Taxi ride", " 350.00 ", "NY Sales tax", " 31.06 "],
    ["12/15/2013", "Meals and Entertainment", "Steve Jobs", "1 Infinite Loop, Cupertino, CA 95014", "Team lunch", " 235.00 ", "CA Sales tax", " 17.63 "],
    ["12/31/2013", "Computer - Hardware", "Jonathan Ive", "1 Infinite Loop, Cupertino, CA 95014", "HP Laptop", " 999.00 ", "CA Sales tax", " 74.93 "],
    ["12/14/2013", "Computer - Software", "Tim Cook", "1 Infinite Loop, Cupertino, CA 95014", "Microsoft Office", " 899.00 ", "CA Sales tax", " 67.43 "],
    ["12/6/2013", "Computer - Software", "Sergey Brin", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "iCloud Subscription", " 50.00 ", "CA Sales tax", " 3.75 "],
    ["12/9/2013", "Computer - Software", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "iCloud Subscription", " 50.00 ", "CA Sales tax", " 3.75 "],
    ["11/10/2013", "Meals and Entertainment", "Eric Schmidt", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Coffee with Steve", " 300.00 ", "CA Sales tax", " 22.50 "],
    ["11/12/2013", "Travel", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Taxi ride", " 230.00 ", "CA Sales tax", " 17.25 "],
    ["11/20/2013", "Meals and Entertainment", "Don Draper", "783 Park Ave, New York, NY 10021", "Client dinner", " 200.00 ", "NY Sales tax", " 15.00 "],
    ["10/4/2013", "Travel", "Eric Schmidt", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Flight to Miami", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["10/12/2013", "Computer - Hardware", "Don Draper", "783 Park Ave, New York, NY 10021", "Macbook Air", " 1,999.00 ", "NY Sales tax", " 177.41 "],
    ["12/9/2013", "Computer - Software", "Steve Jobs", "1 Infinite Loop, Cupertino, CA 95014", "Dropbox Subscription", " 15.00 ", "CA Sales tax", " 1.13 "],
    ["9/18/2013", "Travel", "Tim Cook", "1 Infinite Loop, Cupertino, CA 95014", "Taxi ride", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["9/30/2013", "Office Supplies", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Paper", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["12/30/2013", "Meals and Entertainment", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Dinner with potential acquisition", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["1/6/2014", "Computer - Hardware", "Eric Schmidt", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "iPhone", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["1/7/2014", "Travel", "Steve Jobs", "1 Infinite Loop, Cupertino, CA 95014", "Airplane ticket to NY", " 200.00 ", "CA Sales tax", " 15.00 "],
    ["2/3/2014", "Meals and Entertainment", "Jonathan Ive", "1 Infinite Loop, Cupertino, CA 95014", "Starbucks coffee", " 12.00 ", "CA Sales tax", " 0.90 "],
    ["2/18/2014", "Travel", "Eric Schmidt", "1600 Amphitheatre Parkway, Mountain View, CA 94043", "Airplane ticket to NY", " 1,500.00 ", "CA Sales tax", " 112.50 "]
]
=end
