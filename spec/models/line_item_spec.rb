require 'rails_helper'

describe LineItem do
  describe '.from' do
    let(:date) { Date.new(2013, 9, 30) }
    let(:name) { 'Paper' }
    let(:amount) { 200.0 }
    let(:row) { [date.strftime('%m/%d/%Y'), "Office Supplies", "Larry Page", "1600 Amphitheatre Parkway, Mountain View, CA 94043", name, " #{amount} ", "CA Sales tax", " 15.00 "] }

    subject(:line_item) { LineItem.from(row).attributes }

    it { is_expected.to eql LineItem.new(item_date: date, item_name: name, item_amount: amount).attributes }
  end

  # not unit test as relies on db - should be in integration?
  describe '.monthly_report' do
    let(:items) {[
      LineItem.new(item_date: Date.new(2013,9,30), item_name: 'first', item_amount: 100),
      LineItem.new(item_date: Date.new(2013,9,30), item_name: 'second', item_amount: 200),
      LineItem.new(item_date: Date.new(2013,10,30), item_name: 'third', item_amount: 300),
      LineItem.new(item_date: Date.new(2013,10,30), item_name: 'fourth', item_amount: 400),
      LineItem.new(item_date: Date.new(2014,9,30), item_name: 'fifth', item_amount: 500),
    ]}
    before { items.each { |item| item.save } }
    after { LineItem.delete_all }

    it 'generates the correct report' do
      report = LineItem.monthly_report
      expect(report.length).to eql 3
      expect(report[0][:year_month]).to eql '2013-09'
      expect(report[0][:amount]).to eql 300.0
      expect(report[1][:year_month]).to eql '2013-10'
      expect(report[1][:amount]).to eql 700.0
      expect(report[2][:year_month]).to eql '2014-09'
      expect(report[2][:amount]).to eql 500.0
    end
  end
end
