require 'test_helper'

class EmployeeNameTest < ActiveSupport::TestCase
  test "first name last name parses correctly" do
    assert_equal "Jim Graham", Employee.format_name_string("Jim Graham")
  end

  test "first name last name with spaces parses correctly" do
    assert_equal "Jim Graham", Employee.format_name_string("Jim  Graham")
    assert_equal "Jim Graham", Employee.format_name_string(" Jim Graham")
    assert_equal "Jim Graham", Employee.format_name_string("Jim Graham ")
  end

  test "last name, first name parses correctly" do
    assert_equal "Jim Graham", Employee.format_name_string("Graham, Jim")
  end

  test "last name, first name with spaces parses correctly" do
    assert_equal "Jim Graham", Employee.format_name_string("Graham,  Jim")
    assert_equal "Jim Graham", Employee.format_name_string(" Graham, Jim")
    assert_equal "Jim Graham", Employee.format_name_string("Graham, Jim ")
  end

  test "first name last name, suffix parses correctly" do
    assert_equal "Jim Graham, Jr", Employee.format_name_string("Jim Graham, Jr")
  end

  test "first name last name, suffix with spaces parses correctly" do
    assert_equal "Jim Graham, Jr", Employee.format_name_string(" Jim Graham, Jr")
    assert_equal "Jim Graham, Jr", Employee.format_name_string("Jim  Graham, Jr")
    assert_equal "Jim Graham, Jr", Employee.format_name_string("Jim Graham, Jr ")
    assert_equal "Jim Graham, Jr", Employee.format_name_string("Jim Graham,Jr ")
  end
end
