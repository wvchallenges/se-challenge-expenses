require 'test_helper'

class ExpenseSheetsControllerTest < ActionController::TestCase

  setup do
    @expense_sheet = expense_sheets(:default)
  end

  def test_splash
    get :splash
    assert_response :success
    assert_template :splash
  end

  def test_new
    get :new
    assert_response :success
    assert_template :new
  end

  def test_upload
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
