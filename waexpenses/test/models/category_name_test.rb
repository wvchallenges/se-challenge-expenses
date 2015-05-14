require 'test_helper'

class CategoryNameTest < ActiveSupport::TestCase
  test "Single category parses correctly" do
    categories = Category.find_category_names("Computer");
    assert_equal "Computer", categories[0];

    categories = Category.find_category_names(" Computer ");
    assert_equal "Computer", categories[0]

    categories = Category.find_category_names(" Computer -");
    assert_equal 1, categories.count
    assert_equal "Computer", categories[0];

    categories = Category.find_category_names(" Computer - ");
    assert_equal 1, categories.count
    assert_equal "Computer", categories[0];
  end

  test "Multiple category parses correctly" do
    categories = Category.find_category_names("Computer - Hardware");
    assert_equal 2, categories.count
    assert_equal "Computer", categories[0];
    assert_equal "Hardware", categories[1];

    categories = Category.find_category_names(" Computer  -  Hardware ");
    assert_equal 2, categories.count
    assert_equal "Computer", categories[0];
    assert_equal "Hardware", categories[1];

    categories = Category.find_category_names(" Computer  -  Hardware - Mac");
    assert_equal 3, categories.count
    assert_equal "Computer", categories[0];
    assert_equal "Hardware", categories[1];
    assert_equal "Mac", categories[2];
  end

  test "multiple heirarchy creates from full name" do
    category = Category.new name: "Computer"
    assert category.save, "Category with name is saved"
    subcategory = category.children.create name: "Hardware"
    subsubcategory = subcategory.children.create name: "Mac"

    assert_equal category.full_name, "Computer"
    assert_equal category.name, "Computer"

    assert_equal subcategory.name, "Hardware"
    assert_equal subcategory.full_name, "Computer - Hardware"

    assert_equal subsubcategory.name, "Mac"
    assert_equal subsubcategory.full_name, "Computer - Hardware - Mac"
  end
end
