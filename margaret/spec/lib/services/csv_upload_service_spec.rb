require 'rails_helper'

describe Services::CsvUploadService do
  let(:csv_file) { Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/test.csv'), 'text/csv') }
  let(:sam_james) { create(:sam_james) }

  describe 'integration tests (process)' do
    it { pending "TODO" }
  end

  describe 'protected methods' do
    describe '#read_csv_file' do
      subject { described_class.new(business: sam_james, csv: csv_file)}

      it { pending "TODO" }
    end

    describe '#create_report' do
      it { pending "TODO" }
    end

    describe '#create_entries' do
      it { pending "TODO" }
    end

    describe '#csv_to_report_entries' do
      it { pending "TODO" }
    end
  end
end