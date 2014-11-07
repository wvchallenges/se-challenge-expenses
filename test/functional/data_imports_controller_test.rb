require 'test_helper'

class DataImportsControllerTest < ActionController::TestCase
  setup do
    @data_import = data_imports(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:data_imports)
  end

end
