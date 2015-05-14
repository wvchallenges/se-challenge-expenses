require 'test_helper'

class CategoriesControllerTest < ActionController::TestCase

  setup do
    #-- Factory girl
    @category = Category.new name: "Computer"
    @category.save!
  end

  def teardown
    @category.destroy
    @category = nil
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create category" do
    assert_difference('Category.count') do
      post :create, category: { category_id: @category.category_id, description: @category.description, name: @category.name }
    end

    assert_redirected_to category_path(assigns(:category))
  end

  test "should show category" do
    get :show, id: @category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @category
    assert_response :success
  end

  test "should update category" do
    patch :update, id: @category, category: { category_id: @category.category_id, description: @category.description, name: @category.name }
    assert_redirected_to category_path(assigns(:category))
  end

  test "should destroy category" do
    assert_difference('Category.count', -1) do
      delete :destroy, id: @category
    end

    assert_redirected_to categories_path
  end
end
