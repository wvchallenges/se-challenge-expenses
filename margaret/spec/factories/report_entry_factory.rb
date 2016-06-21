FactoryGirl.define do
  factory :report_entry, class: "Business::ReportEntry" do
    date                { Time.now } 
    category            { Faker::Commerce.department }
    employee_name       { Faker::Name.name }
    employee_address    { "#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state} #{Faker::Address.zip_code}" }
    expense_description { Faker::Company.buzzword }
    amount_before_tax   { rand(1..20000) }
    tax_name            "Sales Tax"
    tax_amount          { rand(1.1000) }
  end
end