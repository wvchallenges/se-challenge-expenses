require 'test_helper'

class TaxesControllerTest < ActionController::TestCase

  setup do
    #-- Factory girl
    @tax = Tax.new name: "CA Tax"
    @tax.save!
  end

  teardown do
    @tax.destroy
    @tax = nil
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:taxes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tax" do
    assert_difference('Tax.count') do
      post :create, tax: { name: @tax.name }
    end

    assert_redirected_to tax_path(assigns(:tax))
  end

  test "should show tax" do
    get :show, id: @tax
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tax
    assert_response :success
  end

  test "should update tax" do
    patch :update, id: @tax, tax: { name: @tax.name }
    assert_redirected_to tax_path(assigns(:tax))
  end

  test "should destroy tax" do
    assert_difference('Tax.count', -1) do
      delete :destroy, id: @tax
    end

    assert_redirected_to taxes_path
  end
end
