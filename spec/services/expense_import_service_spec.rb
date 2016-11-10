require 'csv'

describe ExpenseImportService do
  describe '#import' do
    let(:csv) do
      # rubocop:disable LineLength
      "date,category,employee name,employee address,expense description,pre-tax amount,tax name,tax amount\n" \
      '9/30/2013,Office Supplies,Larry Page,"1600 Amphitheatre Parkway, Mountain View, CA 94043",Paper, 200.00 ,CA Sales tax, 15.00'
      # rubocop:enable LineLength
    end
    let(:csv_row) { CSV.parse(csv, headers: true).first }

    it 'creates an expense' do
      service = described_class.new

      expect { service.import csv_row }.to change(Expense, :count).by(1)

      expense = Expense.last
      expect(expense.date).to eq(Date.new(2013, 9, 30))
      expect(expense.category_name).to eq('Office Supplies')
      expect(expense.employee_name).to eq('Larry Page')
      expect(expense.employee_address).to eq('1600 Amphitheatre Parkway, Mountain View, CA 94043')
      expect(expense.description).to eq('Paper')
      expect(expense.pre_tax_amount).to eq(Money.new(200 * 100))
      expect(expense.tax_name).to eq('CA Sales tax')
      expect(expense.tax_amount).to eq(Money.new(15 * 100))
    end
  end
end
