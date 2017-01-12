require 'test_helper'

class ExpenseDocumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get expense_documents_create_url
    assert_response :success
  end

end
