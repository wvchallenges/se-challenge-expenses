require 'rails_helper'
require_relative Rails.root.join('app/lib/parser.rb')

RSpec.describe Parser, type: :model do
  let(:file_path) { 'spec/fixtures/sample.csv' }

  describe '.parse!' do
    let(:csv) { File.read(file_path) }
    let(:expected_first_row) do
      {
        employee: {
          name: 'Don Draper',
          address: '783 Park Ave, New York, NY 10021'
        },
        tax: {
          name: 'NY Sales tax'
        },
        category: {
          name: 'Travel'
        },
        expense: {
          date: Date.new(2013, 12, 1),
          description: 'Taxi ride',
          pre_tax_amount: 350.00,
          tax_amount: 31.06
        }
      }
    end

    let(:first_row) { described_class.parse!(csv).first }

    it 'first row' do
      expect(first_row).to eq(expected_first_row)
    end
  end
end
