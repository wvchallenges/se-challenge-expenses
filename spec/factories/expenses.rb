FactoryGirl.define do
  factory :expense do
    category
    tax
    employee
    upload
    date { rand(2.years).seconds.ago }
    description { FFaker::Lorem.words(10) }
    pre_tax_amount { Money.new(10_000) }
    tax_amount { Money.new(2_000) }
  end
end
