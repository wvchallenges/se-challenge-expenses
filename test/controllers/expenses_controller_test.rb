require 'test_helper'

class ExpensesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert assigns(:expenses)
  end
end
