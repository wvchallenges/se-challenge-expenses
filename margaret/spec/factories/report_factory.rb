FactoryGirl.define do
  factory :report, class: "Business::Report" do
    business     { create(:sam_james) }
  end
end