require 'rails_helper'

describe Api::BusinessesController, type: :controller do
  describe 'GET api/businesses/search' do
    render_views

    let(:sam_james) { create(:sam_james) }
    let(:ezras_pound) { create(:ezras_pound) }

    before(:each) do
      sam_james; ezras_pound 
      BusinessIndex.purge!
      BusinessIndex.import
      request.accept = 'application/json'
    end

    it 'returns sam james' do
      get :search, {query: 'sam jame'}
      expect(response).to be_success
      results = JSON.parse(response.body).map(&:with_indifferent_access)
      expect(results.length).to eq(1)
      # remote "score" since it is non-deterministic
      results = [results.first.except("score")]
      expect(results.first).to eq({
        "id" => sam_james.id, 
        "name" => sam_james.name, 
        "address" => sam_james.address,  
        "link_to_business" => "/business/businesses/#{sam_james.id}"
      })
    end

    it 'returns ezras pound' do
      get :search, {query: 'ezra'}
      expect(response).to be_success
      results = JSON.parse(response.body).map(&:with_indifferent_access)
      expect(results.length).to eq(1)
      results = [results.first.except("score")]
      expect(results.first).to eq({
        "id"=> ezras_pound.id, 
        "name" => ezras_pound.name,
        "address" => ezras_pound.address,
        "link_to_business" => "/business/businesses/#{ezras_pound.id}"
      })
    end

    it 'no results' do
      get :search, { query: 'BADQUERY' }
      expect(response).to be_success
      results = JSON.parse(response.body)
      expect(results.length).to eq(0)
    end
  end

  describe 'GET api/businesses/:business_id/search_reports' do
    render_views

    let(:sam_james) { create(:sam_james) }
    let(:ezras_pound) { create(:ezras_pound) }

    let(:report1) { create(:report, business: sam_james) }
    let(:report2) { create(:report, business: ezras_pound) }

    let(:report_entry1) { create(:report_entry, report: report1, business: report1.business, employee_name: "Roger Firehands") }
    let(:report_entry2) { create(:report_entry, report: report1, business: report1.business, employee_name: "Sally Rumbleyard") }

    let(:report_entry3) { create(:report_entry, report: report2, business: report2.business, employee_name: "Patricia Voidbringer") }
    let(:report_entry4) { create(:report_entry, report: report1, business: report1.business, employee_name: "Sally Hammerhair") }

    before(:each) do
      report_entry1; report_entry2; report_entry3; report_entry4
      BusinessIndex.purge!
      BusinessIndex.import!
      ReportEntryIndex.purge!
      ReportEntryIndex.import!

      request.accept = 'application/json'
    end

    it "finds employee by name" do
      get :search_reports, id: report1.business_id, query: 'roger'
      expect(response).to be_success
      results = JSON.parse(response.body).map(&:with_indifferent_access)
      expect(results.length).to eq(1)
      results = [results.first.except("score")]
      expect(results.first).to eq({
        "report_id" => report_entry1.report.id,
        "business_id" => report_entry1.business.id,
        "category" => report_entry1.category,
        "employee_name" => report_entry1.employee_name,
        "employee_address" => report_entry1.employee_address,
        "expense_description" => report_entry1.expense_description,
        "date" => report_entry1.date.to_s[0..9].gsub(/-/, '/'),
        "amount_before_tax" => ("%.2f" % (report_entry1.amount_before_tax/100.00)),
        "tax_name" => "Sales Tax",
        "tax_amount" => ("%.2f" % (report_entry1.tax_amount/100.00)),
        "link_to_report" => "/business/businesses/#{report_entry1.business_id}/reports/#{report_entry1.business_report_id}"
      })
    end

    it "finds employees sharing the same name" do
      get :search_reports, id: report1.business_id, query: "sally"
      expect(response).to be_success
      results = JSON.parse(response.body).map(&:with_indifferent_access)
      expect(results.length).to eq(2)
    end

    it "scopes by business" do
      get :search_reports, id: report1.business_id, query: 'patricia'
      expect(response).to be_success
      expect(JSON.parse(response.body)).to eq([])
    end
  end
end