require 'rails_helper'

describe Business::ReportEntry do
  describe 'associations' do
    it { expect(subject).to belong_to(:report).class_name("Business::Report").with_foreign_key(:business_report_id) }
    it { expect(subject).to belong_to(:business).class_name("Business::Business").with_foreign_key(:business_id) }
  end

  describe 'validations' do
    it { expect(subject).to validate_presence_of(:date) }
    it { expect(subject).to validate_presence_of(:category) }
    it { expect(subject).to validate_presence_of(:employee_name) }
    it { expect(subject).to validate_presence_of(:employee_address) }
    it { expect(subject).to validate_presence_of(:expense_description) }
    it { expect(subject).to validate_presence_of(:amount_before_tax) }
    it { expect(subject).to validate_presence_of(:tax_name) }
    it { expect(subject).to validate_presence_of(:tax_amount) }
  end

  describe 'class methods' do
    describe '.convert_amount_to_cents' do
      let(:test_cases) {{
        "4.00" => 400,
        "1,000.00" => 100000
      }}

      it "runs all cases" do
        test_cases.each do |arg, response|
          expect(described_class.convert_amount_to_cents(arg)).to eq(response)
        end
      end
    end

    describe '.parse_date' do
      let(:test_cases) {{
        "12/14/2003" => Date.new(2003, 12, 14),
        "06/1/1991" => Date.new(1991, 6, 1)
      }}

      it "runs all cases" do
        test_cases.each do |arg, response|
          expect(described_class.parse_date(arg)).to eq(response)
        end
      end
    end

    describe '.construct' do
      let(:sam_james) { create(:sam_james) }
      let(:report)    { create(:report, business: sam_james) }

      let(:args) {{
        report: report,
        date: "12/4/2012",
        category: "Lunch",
        employee_name: "Timmy Crimble",
        employee_address: "144 Colonel Sanders Blvd., Flavorton OH",
        expense_description: "Tasty tasty lunch",
        amount_before_tax: "14.40",
        tax_name: "Obamacare",
        tax_amount: "1.44"
      }}

      it "creates a valid object" do
        entity = described_class.construct(args)
        expect(entity.valid?).to be_truthy
        expect(entity.report).to eq(report)
        expect(entity.business).to eq(sam_james)
        expect(entity.date).to eq(Date.new(2012, 12, 4))
        expect(entity.category).to eq("Lunch")
        expect(entity.employee_name).to eq("Timmy Crimble")
        expect(entity.employee_address).to eq("144 Colonel Sanders Blvd., Flavorton OH")
        expect(entity.expense_description).to eq("Tasty tasty lunch")
        expect(entity.amount_before_tax).to eq(1440)
        expect(entity.tax_name).to eq("Obamacare")
        expect(entity.tax_amount).to eq(144)
      end
    end
  end
end