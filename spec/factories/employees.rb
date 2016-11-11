FactoryGirl.define do
  factory :employee do
    name { FFaker::Name.name }
    address { FFaker::Address.street_address }
  end
end
