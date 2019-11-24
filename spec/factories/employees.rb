FactoryGirl.define do
  factory :employee do
    sequence(:name) { |n| "Person #{n}" }
    address "123 Fake St."
  end
end
