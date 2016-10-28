FactoryGirl.define do
  factory :tax_type do
    sequence(:name) { |n| "Tax Type #{n}" }
  end
end
