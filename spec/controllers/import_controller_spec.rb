require 'rails_helper'

describe ImportController do
  describe '#results' do
    let(:file) { 'spec/support/files/data_example.csv' }
    let(:expected_report) {
      {
      "2013-09" => 400.0,
      "2013-10" => 2199.0,
      "2013-11" => 730.0,
      "2013-12" => 2798.0,
      "2014-01" => 400.0,
      "2014-02" => 1512.0
      }
    }

    before { LineItem.delete_all }
    after { LineItem.delete_all }

    it 'creates a LineItem for every row in the file' do
      response = post :results, params: { file: file }
      expect(response).to have_http_status(:ok)
      expect(LineItem.count).to eq 19
    end

    it 'returns a report on the items created' do
      response = post :results, params: { file: file }
      expect(response.content_type).to eq "application/json"
      expect(JSON.parse(response.body)).to eq expected_report
    end

    it 'returns a report just on the items uploaded (not cumulative)' do
      response = post :results, params: { file: file }
      expect(JSON.parse(response.body)).to eq expected_report
      response = post :results, params: { file: file }
      expect(JSON.parse(response.body)).to eq expected_report
    end

  end

end
