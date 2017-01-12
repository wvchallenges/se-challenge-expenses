require 'test_helper'

class EmployeeExpensesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @employee_expense = employee_expenses(:one)
  end

  test "should get index" do
    get employee_expenses_url
    assert_response :success
  end

  test "should get new" do
    get new_employee_expense_url
    assert_response :success
  end

  test "should create employee_expense" do
    assert_difference('EmployeeExpense.count') do
      post employee_expenses_url, params: { employee_expense: { category_id: @employee_expense.category_id, date: @employee_expense.date, description: @employee_expense.description, employee_id: @employee_expense.employee_id, pre_tax_amount: @employee_expense.pre_tax_amount, tax_amount: @employee_expense.tax_amount, tax_name: @employee_expense.tax_name } }
    end

    assert_redirected_to employee_expense_url(EmployeeExpense.last)
  end

  test "should show employee_expense" do
    get employee_expense_url(@employee_expense)
    assert_response :success
  end

  test "should get edit" do
    get edit_employee_expense_url(@employee_expense)
    assert_response :success
  end

  test "should update employee_expense" do
    patch employee_expense_url(@employee_expense), params: { employee_expense: { category_id: @employee_expense.category_id, date: @employee_expense.date, description: @employee_expense.description, employee_id: @employee_expense.employee_id, pre_tax_amount: @employee_expense.pre_tax_amount, tax_amount: @employee_expense.tax_amount, tax_name: @employee_expense.tax_name } }
    assert_redirected_to employee_expense_url(@employee_expense)
  end

  test "should destroy employee_expense" do
    assert_difference('EmployeeExpense.count', -1) do
      delete employee_expense_url(@employee_expense)
    end

    assert_redirected_to employee_expenses_url
  end
end
