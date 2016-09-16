require 'test_helper'

class ImportControllerTest < ActionDispatch::IntegrationTest
  test "should get form" do
    get import_form_url
    assert_response :success
  end

  test "should get results" do
    get import_results_url
    assert_response :success
  end

end
