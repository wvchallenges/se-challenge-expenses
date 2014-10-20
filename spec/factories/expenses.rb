# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :expense do
    category "MyString"
    date "2014-10-19 17:43:44"
    expense_description "MyString"
    pre_tax_amount 1.5
    tax_name "MyString"
    tax_amount 1.5
    csvfile_id 1
    employee_id 1
  end
end
