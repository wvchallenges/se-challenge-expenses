require 'test_helper'

class ExpensesControllerTest < ActionController::TestCase

  def upload_csv
    @csv_file ||= fixture_file_upload('files/data_example.csv', 'text/csv')
    post :import, csv_file: @csv_file
  end

  test '#import should populate db with correct # of objects' do
    upload_csv
    assert_equal Expense.count, 19 
    assert_equal Employee.count, 7
    assert_equal Tax.count, 2
    assert_equal ExpenseCategory.count, 5
  end

  test '#import should assign the correct fields and relationships' do
    upload_csv
    tax = Tax.first
    category = ExpenseCategory.first
    employee = Employee.first
    expense = Expense.first

    assert_equal 'NY Sales tax', tax.name
    assert_equal 'Travel', category.name

    assert_equal 'Don Draper', employee.name
    assert_equal '783 Park Ave, New York, NY 10021', employee.address

    assert_equal 'Taxi ride', expense.description
    assert_equal Date.new(2013,12,1), expense.expense_date
    assert_equal 350.00, expense.pretax_amount
    assert_equal 31.06, expense.tax_amount

    assert_equal tax, expense.tax
    assert_equal employee, expense.employee
    assert_equal category, expense.expense_category
  end

  test '#import should not duplicate Employees' do
    Employee.create!(name: 'Don Draper',
                     address: '783 Park Ave, New York, NY 10021')
    assert_equal 1, Employee.where(name: 'Don Draper').count

    upload_csv
    assert_equal 1, Employee.where(name: 'Don Draper').count
  end

  test '#import should not duplicate Taxes' do
    Tax.create! name: 'NY Sales tax'
    assert_equal 1, Tax.where(name: 'NY Sales tax').count

    upload_csv
    assert_equal 1, Tax.where(name: 'NY Sales tax').count
  end

  test '#import should not duplicate ExpenseCategories' do
    ExpenseCategory.create! name: 'Travel'
    assert_equal 1, ExpenseCategory.where(name: 'Travel').count

    upload_csv
    assert_equal 1, ExpenseCategory.where(name: 'Travel').count
  end

  test '#import should alert user of empty file' do
    post :import, csv_file: nil

    assert_equal 'Please select a file!', assigns(:error_message) 
    assert_template :upload
  end

  test '#import should alert user of malformed CSV' do
    post :import, csv_file: fixture_file_upload('/files/bad_csv.csv')

    assert_equal 'Malformed CSV file!', assigns(:error_message)
    assert_template :upload
  end

end
