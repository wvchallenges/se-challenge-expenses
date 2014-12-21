require 'test_helper'

class ExpenseControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get import" do
    get :import
    assert_response :success
  end

  test "should get monthly" do
    get :monthly
    assert_response :success
  end

end
