require 'test_helper'

class CsvImportTest < ActiveSupport::TestCase   
  test "csv file is imported" do
    csv_file_path = File.join ActiveSupport::TestCase.fixture_path, "../data/data_example.csv"

    csv_file = File.open csv_file_path, "r"
    csv_file.close

    CsvImport.import csv_file

    #Employee.all.each do |e|
    #  p e
    #end
    assert_equal 7, Employee.all.count, "7 employees imported"

    assert_equal 19, Expense.all.count, "19 expenses imported"
    assert_equal 350.00, Expense.all[0].amount, "$350 taxi ride"
    assert_equal 31.06, Expense.all[0].tax_amounts[0].amount, "$31.06 in tax"
    assert_equal 1500.00, Expense.all[-1].amount, "$1500 airplane ride"
    assert_equal 112.50, Expense.all[-1].tax_amounts[0].amount, "$112.50 in tax"

    assert_equal 2, Tax.all.count, "2 taxes"
    assert_equal "NY Sales tax", Tax.all[0].name, "NY tax"
    assert_equal 3, Tax.all[0].tax_amounts.count, "3 NY tax amounts"

    assert_equal "CA Sales tax", Tax.all[1].name, "CA tax"
    assert_equal 16, Tax.all[1].tax_amounts.count, "16 CA tax amounts"
  end

  test "csv file is imported with correct categories" do
    csv_file_path = File.join ActiveSupport::TestCase.fixture_path, "../data/data_example.csv"

    csv_file = File.open csv_file_path, "r"
    csv_file.close

    CsvImport.import csv_file

    expenses = Expense.all
    assert_equal "Travel", expenses[0].category.name, "First expense is 'Travel'"
    assert_equal "Meals and Entertainment", expenses[-2].category.name, "Second to last expense is 'Meals and Entertainment'"
    
    assert_equal "Computer - Hardware", expenses[2].category.full_name, "Third expense is 'Computer - Hardware'"
    assert_equal "Hardware", expenses[2].category.name, "Third expense name is 'Hardware'"
    assert_equal "Computer", expenses[2].category.parent.name, "Third expense name has a parent"
  end

  test "csv file imported twice adds once" do
    self.use_transactional_fixtures = false
    csv_file_path = File.join ActiveSupport::TestCase.fixture_path, "../data/data_example.csv"

    csv_file = File.open csv_file_path, "r"
    csv_file.close

    CsvImport.import csv_file
    CsvImport.import csv_file

    #Employee.all.each do |e|
    #  p e
    #end
    assert_equal 7, Employee.all.count, "only 7 employees imported"
    assert_equal 19, Expense.all.count, "only 19 expenses imported"
  end

  test "csv file with more than one expense per employee imports" do
    csv_file_path = File.join ActiveSupport::TestCase.fixture_path, "../data/data_example_duplicate_employees.csv"

    csv_file = File.open csv_file_path, "r"
    csv_file.close

    CsvImport.import csv_file

    assert_equal 7, Employee.all.count, "7 employees imported"
    assert_equal 21, Expense.all.count, "21 expenses imported"
  end
end