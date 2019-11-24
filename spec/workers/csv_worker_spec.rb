require 'spec_helper'

RSpec.describe CSVWorker, type: :integration do
  let(:csv_file) { create(:csv_file) }

  subject { described_class.new.perform(csv_file.id) }

  it 'calls to the CSVProcessor to create objects' do
    expect(CSVProcessor).to receive(:process).with(csv_file).and_return true

    subject
  end

  it 'sets the csv_file status to processed when complete' do
    allow(CSVProcessor).to receive(:process).and_return true

    subject

    expect(csv_file.reload).to be_processed
  end

  it 'sets the csv_file status to failed if the csv processing fails' do
    allow(CSVProcessor).to receive(:process).and_return false

    subject

    expect(csv_file.reload).to be_failed_processing
  end
end
