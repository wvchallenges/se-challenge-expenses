FactoryGirl.define do

  factory :csv_file, class: CSVFile do

    trait :saved do
      location 'spec/fixtures/data_example.csv'
      check_id { SecureRandom.uuid }
      status 'saved'
    end

    trait :simple do
      location 'spec/fixtures/data_example_simple.csv'
    end
  end
end
