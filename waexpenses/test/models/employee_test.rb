require 'test_helper'

class EmployeeTest < ActiveSupport::TestCase
  test "new employee is created" do
    employee = Employee.new
    assert_not employee.save, "Cannot save employee without name"

    employee = Employee.new name: "Jim Graham"
    assert employee.save, "Employee with name is saved"
  end

  test "existing employee is found" do
    employee = Employee.new name: "Jim Graham", address: "Toronto ON"
    assert employee.save, "Employee with name is saved"

    found_employee = Employee.find_or_create_from_name("Jim Graham")
    assert_equal "Toronto ON", found_employee.address, "Existing employee found"
  end

  test "existing employee with 'Last, First' is found" do
    employee = Employee.new name: "James Graham", address: "Vancouver BC"
    assert employee.save, "Employee with name is saved"

    found_employee = Employee.find_or_create_from_name("Graham, James")
    assert_equal "Vancouver BC", found_employee.address, "Existing employee found"
  end

  test "existing employee with 'First Last, Jr' is found" do
    employee = Employee.new name: "Jim Graham, Jr", address: "Montreal, PQ"
    assert employee.save, "Employee with name is saved"

    found_employee = Employee.find_or_create_from_name("Jim Graham, Jr")
    assert_equal "Montreal, PQ", found_employee.address, "Existing employee found"
  end
end
