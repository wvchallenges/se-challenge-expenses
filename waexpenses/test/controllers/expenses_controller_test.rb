require 'test_helper'

class ExpensesControllerTest < ActionController::TestCase
  setup do
    #-- not from fixture. Look at Factory Girl
    @employee = Employee.new name: "Jim Graham", address: "Toronto ON"
    @employee.save!    
    @category = Category.find_or_create_by_heirarchy("Computer - Hardware")
    @category.save!
    @expense = @employee.expenses.create description: "test", amount_cents: 129900, date: DateTime.now, category_id: @category.id
    @tax = Tax.new name: "CA Tax"
    @tax.save!
    @amount = @tax.tax_amounts.create amount_cents: 12990
    @expense.tax_amounts << @amount
    @tax.expenses << @expense
    @tax.save!
    @expense.save!
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

  test "should show expense" do
    get :show, id: @expense
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @expense
    assert_response :success
  end

  test "should update expense" do
    patch :update, id: @expense, expense: {  }
    assert_redirected_to expense_path(assigns(:expense))
  end

  test "should destroy expense" do
    assert_difference('Expense.count', -1) do
      delete :destroy, id: @expense
    end

    assert_redirected_to expenses_path
  end
end
