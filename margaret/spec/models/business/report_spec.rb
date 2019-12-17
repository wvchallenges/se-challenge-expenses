require 'rails_helper'

describe Business::Report do
  describe 'associations' do
    it { expect(subject).to belong_to(:business).class_name("Business::Business").with_foreign_key(:business_id) }
    it { expect(subject).to have_many(:entries).class_name("Business::ReportEntry").with_foreign_key(:business_report_id) }
  end

  describe 'class methods' do
    describe '.entry_schema' do
      it { expect(described_class.entry_schema).to eq(
        %w(date category employee_name employee_address expense_description amount_before_tax tax_name tax_amount)
      )}
    end

    describe 'construct' do
      let(:sam_james) { create(:sam_james) }
      it "builds the object" do
        entity = described_class.construct(business: sam_james)
        expect(entity.business).to eq(sam_james)
        expect(entity.valid?).to be_truthy
      end
    end
  end
end