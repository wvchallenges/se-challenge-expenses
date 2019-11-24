require 'spec_helper'

RSpec.describe ReportGenerator do
  let!(:csv_file) { create(:csv_file, :processed) }
  let!(:expense_entry) { create(:expense_entry, date: Date.new(2012, 01, 01), csv_file: csv_file) }
  let!(:expense_entry2) { create(:expense_entry, date: Date.new(2012, 03, 02), csv_file: csv_file) }
  let!(:expense_entry3) { create(:expense_entry, date: Date.new(2012, 02, 01), csv_file: csv_file) }
  let!(:expense_entry4) { create(:expense_entry, date: Date.new(2012, 01, 01), csv_file: csv_file) }

  subject { described_class.generate_expense_report(csv_file) }

  it 'returns an array of months and amounts expensed for that month' do
    result = subject

    expect(result).to be_a Hash
    expect(result['2012-01']).to eq(expense_entry.total_expense + expense_entry2.total_expense)
    expect(result['2012-02']).to eq(expense_entry3.total_expense)
  end

  it 'sorts results based on date' do
    result = subject

    expect(result.keys).to eq(result.keys.sort)
  end
end
