require 'rails_helper'

RSpec.describe Expense, type: :model do

  it { is_expected.to belong_to(:category) }
  it { is_expected.to belong_to(:employee) }

  describe ".from_csv" do
    let(:csv_row) do
      { "date" => "09/18/2016", "expense description" => "testing", "pre-tax amount" => "1,200.00", "tax name" => "foobar", "tax amount" => "1,000.00" }
    end

    let(:expense) { Expense.from_csv csv_row }
    it "should parse date" do
      expect(expense.date).to eq(Date.new(2016, 9, 18))
    end

    it "should parse description" do
      expect(expense.description).to eq("testing")
    end

    it "should parse pretax amount" do
      expect(expense.pretax_amount).to eq(1200.00)
    end

    it "should parse tax name" do
      expect(expense.tax_name).to eq("foobar")
    end

    it "should parse tax amount" do
      expect(expense.tax_amount).to eq(1000.00)
    end
  end
end
