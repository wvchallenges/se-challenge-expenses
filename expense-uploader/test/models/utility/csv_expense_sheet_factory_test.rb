require 'test_helper'

class CsvExpenseSheetFactoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "create sheet from CSV with no expenses is allowed" do

    csv = [
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount"
    ]

    file = Utility::CsvFile.new(csv)

    factory = Utility::CsvExpenseSheetFactory.new
    subject = factory.createSheetFromCsv(Time.now, file)

    assert subject.expenses.length == 0

  end

  test "create sheet with many expences includes all" do

    csv = [
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount",
      "12/1/2013,Travel,Don Draper,123 fake st,Taxi ride, 350.00 ,NY Sales tax, 31.06",
      "11/1/2013,Travel,Don Draper,a real address,Taxi ride, 350.00 ,NY Sales tax, 31.06"
    ]

    file = Utility::CsvFile.new(csv)

    factory = Utility::CsvExpenseSheetFactory.new
    subject = factory.createSheetFromCsv(Time.now, file)

    assert subject.expenses.length == 2
    assert subject.expenses[0].date.month == 12
    assert subject.expenses[1].date.month == 11
  end

  test "create sheet with expenses assigns correct column values" do

    csv = [
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount",
      "12/1/2013,Travel,Don Draper,\"783 Park Ave, New York, NY 10021\",Taxi ride,\" 10,350.00 \",NY Sales tax, 31.06 "
    ]

    file = Utility::CsvFile.new(csv)

    factory = Utility::CsvExpenseSheetFactory.new
    subject = factory.createSheetFromCsv(Time.now, file)

    assert_equal 1, subject.expenses.length
    assert_equal 12, subject.expenses[0].date.month
    assert_equal 1, subject.expenses[0].date.day
    assert_equal 2013, subject.expenses[0].date.year
    assert_equal "Travel", subject.expenses[0].category
    assert_equal "Don Draper", subject.expenses[0].employee_name
    assert_equal "783 Park Ave, New York, NY 10021", subject.expenses[0].employee_address
    assert_equal "Taxi ride", subject.expenses[0].description
    assert_equal "NY Sales tax", subject.expenses[0].tax_name
    assert_equal 10350.00, subject.expenses[0].pre_tax_amount
    assert_equal 31.06, subject.expenses[0].tax_amount
  end

end
