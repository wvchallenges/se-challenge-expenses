require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  setup do
    if Category.all.count  > 0

      Category.all.each do |c|
        c.destroy
      end
    end
  end

  test "new category is created" do
    category = Category.new
    assert_not category.save, "Cannot save category without name"

    category = Category.new name: "Computer"
    assert category.save, "Category with name is saved"
  end

  test "category with child is created" do
    category = Category.new name: "Computer"
    category.save
    category.children.create name: "Hardware"

    found_category = Category.find_by name: "Computer"
    assert_equal 1, found_category.children.count
    assert_equal "Hardware", found_category.children[0].name
    assert_equal found_category, found_category.children[0].parent
  end

  test "category with child is found from name" do
    category = Category.new name: "Computer"
    assert category.save, "Category with name is saved"
    subcategory = category.children.create name: "Hardware"

    found_category = Category.find_or_create_by_heirarchy("Computer - Hardware")
    assert_equal 1, category.children.count, "Correct child count"
    assert_equal found_category, category.children[0], "first child category is the created one"
    assert_equal category, found_category.parent, "first child has correct parent"
    assert_equal found_category, subcategory
  end

  test "category with child is created from name" do
    category = Category.new name: "Computer"
    assert category.save, "Category with name is saved"

    subcategory = Category.find_or_create_by_heirarchy("Computer - Hardware")
    assert_equal 1, category.children.count
    assert_equal subcategory, category.children[0]
    assert_equal category, subcategory.parent
  end

  test "existing category added to tree from name" do
    category = Category.new name: "Computer"
    assert category.save, "Category with name is saved"
    subcategory = category.children.create name: "Hardware"

    subcategory = Category.find_or_create_by_heirarchy("Computer - Software")
    assert_equal 2, category.children.count
    assert_equal subcategory, category.children[1]
    assert_equal category, subcategory.parent
  end

  test "multi level category tree created from name" do
    category = Category.find_or_create_by_heirarchy("Computer - Software - Mac - development")

    ["Computer", "Software", "Mac", "development"].reverse.each do |n|
      assert_equal category.name, n, "Category name expected " + n + ", got " + category.name
      category = category.parent
    end
  end

  test "category tree created from name" do
    category = Category.find_or_create_by_heirarchy("Computer - Software")

    parent = category.parent
    assert_equal 1, parent.children.count
    assert_equal category, parent.children[0]
    assert_equal parent, category.parent

    category = Category.find_or_create_by_heirarchy("Computer - Hardware - Mac")
    parent.children.reload
    assert_equal 2, parent.children.count

    middle_category = parent.children[1]
    assert_equal 1, middle_category.children.count
    assert_equal "Mac", middle_category.children[0].name
  end
end
