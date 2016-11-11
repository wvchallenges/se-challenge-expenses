FactoryGirl.define do
  factory :upload do
    file_name { FFaker::Lorem.word }
  end
end
