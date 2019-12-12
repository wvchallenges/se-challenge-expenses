require 'rails_helper'

RSpec.describe Category, type: :model do
  it { is_expected.to validate_presence_of(:name) }

  describe ".from_csv" do
    let(:csv_row) do
      { "category" => "Travel" }
    end

    let(:category) { Category.from_csv csv_row }
    it "should parse category" do
      expect(category.name).to eq("Travel")
    end
  end
end
