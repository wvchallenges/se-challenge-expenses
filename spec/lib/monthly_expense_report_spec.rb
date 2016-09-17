describe MonthlyExpenseReport do
  describe '.report' do

    let(:items) {[
      LineItem.new(item_date: Date.new(2013,9,30), item_name: 'first', item_amount: 100),
      LineItem.new(item_date: Date.new(2013,9,30), item_name: 'second', item_amount: 200),
      LineItem.new(item_date: Date.new(2013,10,30), item_name: 'third', item_amount: 300),
      LineItem.new(item_date: Date.new(2013,10,30), item_name: 'fourth', item_amount: 400),
      LineItem.new(item_date: Date.new(2014,9,30), item_name: 'fifth', item_amount: 500),
    ]}

    it 'accumulates a sum of expenses by month' do
      report = described_class.new
      items.each { |item| report.add(item) }
      expect(report.monthly).to eql({ '2013-09' => 300.0, '2013-10' => 700.0, '2014-09' => 500.0 })
    end
  end
end
