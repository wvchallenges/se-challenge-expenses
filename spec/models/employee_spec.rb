require 'rails_helper'

RSpec.describe Employee, type: :model do
  it { is_expected.to validate_presence_of(:name) }

  describe ".from_csv" do
    let(:csv_row) do
      { "employee name" => "foo", "employee address" => "Montreal" }
    end

    let(:employee) { Employee.from_csv csv_row }
    it "should parse employee name" do
      expect(employee.name).to eq("foo")
    end

    it "should parse employee address" do
      expect(employee.address).to eq("Montreal")
    end
  end
end
