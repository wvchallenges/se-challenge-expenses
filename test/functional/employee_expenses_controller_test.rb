require 'test_helper'

class EmployeeExpensesControllerTest < ActionController::TestCase
  setup do
    @employee_expense = employee_expenses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:employee_expenses)
  end

end
