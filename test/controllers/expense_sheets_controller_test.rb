require 'test_helper'

class ExpenseSheetsControllerTest < ActionController::TestCase

  setup do
    @expense_sheet = expense_sheets(:default)
  end

  def test_new
    get :new
    assert_response :success
    assert_template :new
  end

  def test_upload
    csv_rows = <<-EOS
date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount
12/1/2013,Travel,Don Draper,"783 Park Ave, New York, NY 10021",Taxi ride, 350.00 ,NY Sales tax, 31.06
12/15/2013,Meals and Entertainment,Steve Jobs,"1 Infinite Loop, Cupertino, CA 95014",Team lunch, 235.00 ,CA Sales tax, 17.63
12/31/2013,Computer - Hardware,Jonathan Ive,"1 Infinite Loop, Cupertino, CA 95014",HP Laptop, 999.00 ,CA Sales tax, 74.93
EOS

    file = Tempfile.new('expenses.csv')
    file.write(csv_rows)
    file.rewind

    assert_difference "Expense.count", 3 do
      post :upload, file: Rack::Test::UploadedFile.new(file, 'text/csv')
    end
    expense = Expense.last
    assert_equal Date.new(2013,12,31), expense.date
    assert_equal 'Jonathan Ive', expense.employee_name
    assert_equal 99900, expense.pre_tax_amount_cents
    assert_equal 7493, expense.tax_amount_cents
    assert_redirected_to expense_sheets_path
    assert_equal "Expense sheet uploaded", flash[:notice]
  end

  def test_index
    expense_sheets = [@expense_sheet]
    get :index
    assert_response :success
    assert_template :index
    assert_equal expense_sheets, assigns(:expense_sheets)
  end

  def test_show
    get :show, id: @expense_sheet
    assert_response :success
    assert_template :show
    assert_equal @expense_sheet, assigns(:expense_sheet)
  end

end
