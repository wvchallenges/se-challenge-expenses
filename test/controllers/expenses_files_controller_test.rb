require 'test_helper'

class ExpensesFilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @expenses_file = expenses_files(:one)
  end

  test "should get index" do
    get expenses_files_url
    assert_response :success
  end

  test "should get new" do
    get new_expenses_file_url
    assert_response :success
  end

  test "should create expenses_file" do
    assert_difference('ExpensesFile.count') do
      post expenses_files_url, params: { expenses_file: { description: @expenses_file.description, name: @expenses_file.name } }
    end

    assert_redirected_to expenses_file_url(ExpensesFile.last)
  end

  test "should show expenses_file" do
    get expenses_file_url(@expenses_file)
    assert_response :success
  end

  test "should get edit" do
    get edit_expenses_file_url(@expenses_file)
    assert_response :success
  end

  test "should update expenses_file" do
    patch expenses_file_url(@expenses_file), params: { expenses_file: { description: @expenses_file.description, name: @expenses_file.name } }
    assert_redirected_to expenses_file_url(@expenses_file)
  end

  test "should destroy expenses_file" do
    assert_difference('ExpensesFile.count', -1) do
      delete expenses_file_url(@expenses_file)
    end

    assert_redirected_to expenses_files_url
  end
end
