FactoryGirl.define do
  factory :business, class: "Business::Business" do
    factory :sam_james do
      name      'Sam James Coffee Brothers'
      address   "297 Harbord St, Toronto, ON M6G 1G7"
    end

    factory :ezras_pound do
      name      "Ezra's Pound"
      address   "238 Dupont St, Toronto, ON M5R 1V7"
    end
  end
end