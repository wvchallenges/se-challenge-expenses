FactoryGirl.define do
  factory :expense_entry do
    date { Date.today }
    category
    employee
    tax_type
    pre_tax_amount 1000
    tax_amount 10
    association :csv_file, :processed
  end
end
