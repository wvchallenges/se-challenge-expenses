FactoryGirl.define do

  factory :csv_file, class: CSVFile do
    location 'spec/fixtures/data_example.csv'
    check_id { SecureRandom.uuid }
    status CSVFile::STATUS_FILE_UPLOADED

    trait :simple do
      location 'spec/fixtures/data_example_simple.csv'
    end

    trait :processed do
      status CSVFile::STATUS_PROCESSED
    end

    trait :processing do
      status CSVFile::STATUS_PROCESSING
    end
  end
end
