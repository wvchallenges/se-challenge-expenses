require 'csv'

describe MonthlyReportService do
  let(:service) { described_class.new }

  def create(attrs)
    FactoryGirl.create :expense, attrs
  end

  describe 'generates monthly reports' do
    context 'with no expenses' do
      it 'returns empty hash' do
        reports = service.monthly_reports
        expect(reports).to eq(
          'Total' => { pre_tax_amount: Money.new(0), tax_amount: Money.new(0) }
        )
      end
    end

    context 'with expenses' do
      before do
        create date: '2016-11-7', pre_tax_amount: Money.new(10_050), tax_amount: Money.new(2_050)
        create date: '2016-11-8', pre_tax_amount: Money.new(20_000), tax_amount: Money.new(1_000)
        create date: '2016-09-1', pre_tax_amount: Money.new(10_000), tax_amount: Money.new(1_000)
      end

      it 'shows correct numbers' do
        reports = service.monthly_reports
        expect(reports).to eq(
          '2016-11' => { pre_tax_amount: Money.new(30_050), tax_amount: Money.new(3_050) },
          '2016-10' => { pre_tax_amount: Money.new(0), tax_amount: Money.new(0) },
          '2016-09' => { pre_tax_amount: Money.new(10_000), tax_amount: Money.new(1_000) },
          'Total' =>   { pre_tax_amount: Money.new(40_050), tax_amount: Money.new(4_050) }
        )
      end
    end

    context 'scoped by upload' do
      let(:upload) { FactoryGirl.create :upload }

      before do
        create upload: upload, date: '2016-11-7', pre_tax_amount: Money.new(10_050), tax_amount: Money.new(2_050)
        create upload: upload, date: '2016-09-1', pre_tax_amount: Money.new(10_000), tax_amount: Money.new(1_000)

        create date: '2016-11-8', pre_tax_amount: Money.new(20_000), tax_amount: Money.new(1_000)
      end

      it 'ignores other expenses' do
        reports = described_class.new(upload).monthly_reports

        expect(reports).to eq(
          '2016-11' => { pre_tax_amount: Money.new(10_050), tax_amount: Money.new(2_050) },
          '2016-10' => { pre_tax_amount: Money.new(0), tax_amount: Money.new(0) },
          '2016-09' => { pre_tax_amount: Money.new(10_000), tax_amount: Money.new(1_000) },
          'Total' =>   { pre_tax_amount: Money.new(20_050), tax_amount: Money.new(3_050) }
        )
      end
    end
  end
end
