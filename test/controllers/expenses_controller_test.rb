require 'test_helper'

class ExpensesControllerTest < ActionController::TestCase
  setup do
    @expense = expenses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:expenses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create expense" do
    assert_difference('Expense.count') do
      post :create, expense: { category_id: @expense.category_id, date: @expense.date, employee_address: @expense.employee_address, employee_id: @expense.employee_id, expense_description: @expense.expense_description, pre_tax_amount: @expense.pre_tax_amount, tax_amount: @expense.tax_amount, tax_id: @expense.tax_id }
    end

    assert_redirected_to expense_path(assigns(:expense))
  end

  test "should show expense" do
    get :show, id: @expense
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @expense
    assert_response :success
  end

  test "should update expense" do
    patch :update, id: @expense, expense: { category_id: @expense.category_id, date: @expense.date, employee_address: @expense.employee_address, employee_id: @expense.employee_id, expense_description: @expense.expense_description, pre_tax_amount: @expense.pre_tax_amount, tax_amount: @expense.tax_amount, tax_id: @expense.tax_id }
    assert_redirected_to expense_path(assigns(:expense))
  end

  test "should destroy expense" do
    assert_difference('Expense.count', -1) do
      delete :destroy, id: @expense
    end

    assert_redirected_to expenses_path
  end
end
