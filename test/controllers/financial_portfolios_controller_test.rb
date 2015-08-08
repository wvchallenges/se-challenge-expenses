require 'test_helper'

class FinancialPortfoliosControllerTest < ActionController::TestCase
  setup do
    @financial_portfolio = financial_portfolios(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:financial_portfolios)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create financial_portfolio" do
    assert_difference('FinancialPortfolio.count') do
      post :create, financial_portfolio: {  }
    end

    assert_redirected_to financial_portfolio_path(assigns(:financial_portfolio))
  end

  test "should show financial_portfolio" do
    get :show, id: @financial_portfolio
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @financial_portfolio
    assert_response :success
  end

  test "should update financial_portfolio" do
    patch :update, id: @financial_portfolio, financial_portfolio: {  }
    assert_redirected_to financial_portfolio_path(assigns(:financial_portfolio))
  end

  test "should destroy financial_portfolio" do
    assert_difference('FinancialPortfolio.count', -1) do
      delete :destroy, id: @financial_portfolio
    end

    assert_redirected_to financial_portfolios_path
  end
end
