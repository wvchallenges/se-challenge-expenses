require 'rails_helper'

describe ReportQuery do
  let(:sam_james) { create(:sam_james) }
  let(:ezras_pound) { create(:ezras_pound) }

  let(:report1) { create(:report, business: sam_james) }
  let(:report2) { create(:report, business: ezras_pound) }

  let(:report_entry1) { create(:report_entry, report: report1, business: report1.business, employee_name: "Roger Firehands") }
  let(:report_entry2) { create(:report_entry, report: report1, business: report1.business, employee_name: "Sally Rumbleyard") }

  let(:report_entry3) { create(:report_entry, report: report2, business: report2.business, employee_name: "Patricia Voidbringer") }
  let(:report_entry4) { create(:report_entry, report: report2, business: report2.business, employee_name: "Sally Hammerhair") }

  before do
    report_entry1; report_entry2; report_entry3; report_entry4
    BusinessIndex.purge!
    BusinessIndex.import!
    ReportEntryIndex.purge!
    ReportEntryIndex.import
  end

  describe 'searching by employee name' do
    it "will find Roger" do
      results = described_class.search(query: "firehand")
      expect(results.length).to eq(1)
      first_result = results.first
      expect(first_result.id).to eq(report_entry1.id)
      expect(first_result.report_id).to eq(report_entry1.business_report_id)
      expect(first_result.employee_name).to eq(report_entry1.employee_name)
    end

    it "will find the Sallys" do
      results = described_class.search(query: "sally")
      expect(results.length).to eq(2)
    end
  end

  describe 'scoping by business' do
    it "will only return the sally for the specified business" do
      results = described_class.search(business_id: report1.business_id, query: "sally")
      expect(results.length).to eq(1)
    end

    it "will not return patricia if she's not at the business" do
      results = described_class.search(business_id: report1.business_id, query: "patricia")
      expect(results.length).to eq(0)
    end
  end
end